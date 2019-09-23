import {Button, Dialog, ProgressBar} from "@blueprintjs/core";
import {Cell, Column, Table, IRegion} from "@blueprintjs/table";
import * as React from "react";
import {connect} from "react-redux";
import {
  DeviceId, IApplicationState,
} from "../store/state";
import SparkManager from "../managers/SparkManager";
import {
  addLog,
  updateSelectedDeviceIsProcessing, updateSelectedDeviceProcessStatus, setSelectedDeviceMotorConfig, SparkDispatch
} from "../store/actions";
import WebProvider from "../providers/WebProvider";
import MotorConfiguration from "../models/MotorConfiguration";
import CANScanDetail from "../models/CANScanDetail";
import { isNullOrUndefined } from "util";
import {getSelectedDeviceId, isSelectedDeviceConnected} from "../store/selectors";
import {fromDeviceId} from "../store/state";

interface IProps {
  deviceId: DeviceId,
  connected: boolean,
  setIsConnecting(connecting: boolean): void,
  updateConnectionStatus(connected: boolean, status: string): void,
  setCurrentConfig(cofig: MotorConfiguration): void,
  addLog(log: string): void
}

interface IState {
  firmwareVersion: string,
  firmwarePath: string,
  outputText: string[],
  loadingFirmware: boolean,
  recoveryRequired: boolean,  
  isOpen: boolean,
  updateProgress: number,
  updateText: string,
  deviceList: CANScanDetail[],
  scanInProgress: boolean,
  loadingCANFirmware: boolean,
}

class FirmwareTab extends React.Component<IProps, IState> {
  private _lastMessage: string;

  constructor(props: IProps) {
    super(props);
    this.state = {
      firmwareVersion: "NOT CONNECTED",
      firmwarePath: "",
      outputText: ["[INFO] Please connect to a device to see it's firmware."],
      loadingFirmware: false,
      recoveryRequired: false,      
      isOpen: false,
      updateProgress: 0,
      updateText: "",
      deviceList: [],
      scanInProgress: false,
      loadingCANFirmware: false,
    };

    this.openFileDialog = this.openFileDialog.bind(this);
    this.updateFirmwareStatus = this.updateFirmwareStatus.bind(this);
    this.loadFirmware = this.loadFirmware.bind(this);

    this._lastMessage = "";
  }
  
  public componentDidMount(): void {
    if (this.props.connected) {
      this.setState({
        outputText: [...this.state.outputText, "[INFO] Connected. Loading firmware version..."]
      });
      this.scrollToBottom();
      SparkManager.getFirmware().then((response: any) => {
        this.setState({
          outputText: [...this.state.outputText, "[INFO] Current firmware version: " + response.version],
          firmwareVersion: response.version
        });
        this.scrollToBottom();
      });
    }    
  }

  public componentDidUpdate(prevProps: Readonly<IProps>): void {
    if (prevProps.connected !== this.props.connected) {
      this.componentDidMount();
    }
  }

  public render() {
    const {outputText, firmwareVersion, loadingFirmware, recoveryRequired} = this.state;
    return (
      <div>
        <Dialog isOpen={this.state.isOpen} 
          onClose={this.closeDialog}>

        <div id="firmware-console">
          {outputText.map((line, index) => {
            return <p key={index}>{line}</p>;
          })}
        </div>

        </Dialog>
        <div>
        <Table enableMultipleSelection={false}
               enableColumnResizing={false}
               enableRowResizing={false}
               numRows={10}
               columnWidths={[75, 150, 150, 75]}
               onSelection={this.handleCellClick}>

            <Column name="Interface" cellRenderer={this.interfaceColumnRenderer} />
            <Column name="Device" cellRenderer={this.deviceColumnRenderer} />
            <Column name="Firmware" cellRenderer={this.firmwareColumnRenderer} />
            <Column name="Update" cellRenderer={this.updateColumnRenderer} />
        </Table>
        </div>        
        <span><Button className="rev-btn" onClick={this.scanDevices} loading={this.state.scanInProgress}>Scan Bus</Button></span>
        <br />

      <div id="firmware-bar">
            <span>Current Firmware: {firmwareVersion}</span>
            <span><Button className="rev-btn" loading={loadingFirmware} onClick={recoveryRequired ? this.loadFirmware : this.openFileDialog}>{recoveryRequired ? "Continue" : "Load Firmware"}</Button></span>
      </div>
        <br />
        <div>
          <ProgressBar value={this.state.updateProgress}/>
          <span>{this.state.updateText}</span>
        </div>
        <br />              
        <span><Button className="rev-btn" onClick={this.handleConsoleClick}>
          {this.state.isOpen ? "Hide" : "Show"} Console
          </Button>
        </span>
      </div>
    );
  }

  private interfaceColumnRenderer = (rowIndex: number) => {
    return <Cell>{`${this.state.deviceList[rowIndex] ? this.state.deviceList[rowIndex].interface : ""}`}</Cell>
  };

  private deviceColumnRenderer = (rowIndex: number) => {
    return <Cell>{`${this.state.deviceList[rowIndex] ? this.state.deviceList[rowIndex].name : ""}`}</Cell>
  };

  private firmwareColumnRenderer = (rowIndex: number) => {
    return <Cell loading={this.state.loadingCANFirmware}>{`${this.state.deviceList[rowIndex] ? this.state.deviceList[rowIndex].firmware : ""}`}</Cell>
  };

  private buildUpdateString = (detail: CANScanDetail) => {
    if (detail && detail.updateable) {
      return detail.selected;
    } else if (detail) {
      return "N/A";
    } else {
      return "";
    }
  }

  private buildUpdateTooltip = (detail: CANScanDetail) => {
    if (detail && detail.updateable) {
      return "Click to add this device to the update group.";
    } else if (detail) {
      return "Unable to update this device.";
    } else {
      return "";
    }
  }

  private updateColumnRenderer = (rowIndex: number) => {
    return <Cell interactive={true}
                 tooltip={`${this.buildUpdateTooltip(this.state.deviceList[rowIndex])}`}
                 onKeyDown={this.handleConsoleClick}>{`${this.buildUpdateString(this.state.deviceList[rowIndex])}`}
                 </Cell>
  };

  private handleCellClick = (region: IRegion[]) => {
    // Ignore anything that is not the last cell
    if (region.length !== 1 || isNullOrUndefined(region[0].cols) || region[0].cols[0] !== 3 || isNullOrUndefined(region[0].rows) || region[0].rows[0] >= this.state.deviceList.length) {
      return;
    }

    const tmp = this.state.deviceList
    tmp[region[0].rows[0]].selected = !tmp[region[0].rows[0]].selected;

    this.setState({deviceList: tmp })
  };

  private handleConsoleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  private scanDevices = () => {
    this.setState({scanInProgress: true, loadingCANFirmware: false});
    SparkManager.listAllDevices().then(value => {
      const deviceDetails = new Array<CANScanDetail>();

      this.setState({loadingCANFirmware: true});

      value.forEach( (deviceString) => {
        deviceDetails.push(new CANScanDetail(deviceString, "Device Name", "Firmware String", false));
      });

      this.setState({ deviceList: deviceDetails, scanInProgress: false, loadingCANFirmware: false });
      
    }).catch( () => {
      this.setState({deviceList: [], scanInProgress: false, loadingCANFirmware: false});
    });
  }

  private closeDialog = () => {
    this.setState({isOpen: false});
  }

  private openFileDialog() {
    SparkManager.requestFirmware().then((paths: any[]) => {
      this.props.setIsConnecting(true);
      this.props.updateConnectionStatus(false, "LOADING FIRMWARE...");
      this.setState({loadingFirmware: true});
      this.scrollToBottom();
      if (paths.length > 0) {
        this.setState({
          firmwarePath: paths[0],
          outputText: [...this.state.outputText, "[INFO] Loading firmware from " + paths[0]]
        });
        this.scrollToBottom();
        this.checkIfRecoveryRequired().then((required: true) => {
          if (required) {
            this.props.setIsConnecting(false);
            this.props.updateConnectionStatus(this.props.connected, "LOADING FIRMWARE...");
            this.setState({
              recoveryRequired: true,
              loadingFirmware: false,
              updateProgress: 0,
              updateText: "",
              outputText: [
                ...this.state.outputText,
                "Your SPARK MAX requires a recovery update for this firmware version. Please follow these steps:",
                "1. Unplug the USB cable to your SPARK MAX and, if connected, disconnect main power.",
                "2. Press and hold the MODE button on the SPARK MAX with a straightened paper clip or something similar.",
                "3. While still holding the MODE button, plug the USB cable back in to the SPARK MAX. You can release the button at this point.",
                "4. Press the 'Continue' button below."
              ]
            });
            this.scrollToBottom();
          } else {
            this.loadFirmware();
          }
        });
      }
    });
  }

  private checkIfRecoveryRequired(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      SparkManager.getFirmware().then((versionJSON: any) => {
        if (versionJSON.version && versionJSON.version.length > 0) {
          const version = versionJSON.version.substring(1, versionJSON.version.length);
          WebProvider.initialize("www.revrobotics.com");
          WebProvider.get("content/sw/max/sparkmax-gui-cfg.json").then((firmwareJSON: any) => {
            if (firmwareJSON.firmware) {
              for (const firmware of firmwareJSON.firmware) {
                if (firmware.spec === "Recovery Update Required") {
                  if (this.isOldFirmware(version, firmware.version)) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                }
              }
            } else {
              reject();
            }
          }).catch(() => {
            resolve(false);
          });
        } else {
          reject();
        }
      }).catch(() => {
        reject();
      });
    });
  }

  private loadFirmware() {
    this.props.setIsConnecting(true);
    this.props.updateConnectionStatus(false, "LOADING FIRMWARE...");
    this.setState({loadingFirmware: true});
    SparkManager.loadFirmware(this.state.firmwarePath, this.updateFirmwareStatus).then((res: any) => {
      if (res.updateComplete && !res.updateCompletedSuccessfully) {
        this.sendFirmwareError(res.root.error);
        this.sendFirmwareError();
      } else {
        this.setState({
          outputText: [...this.state.outputText, "[INFO] Successfully updated firmware. Connecting back to controller..."]
        });
        this.setState({loadingFirmware: false, updateProgress: 0, updateText: ""});
        this.scrollToBottom();
        SparkManager.discoverAndConnect().then((device: string) => {
          this.props.updateConnectionStatus(true, "CONNECTED");
          this.props.setIsConnecting(false);
          setTimeout(() => {
            SparkManager.getConfigFromParams(fromDeviceId(this.props.deviceId)).then((config: MotorConfiguration) => {
              this.props.setCurrentConfig(config);
              SparkManager.getFirmware().then((response: any) => {
                this.setState({firmwareVersion: response.version});
              });
            });
          }, 1000)
        }).catch((error: any) => {
          this.props.updateConnectionStatus(false, "CONNECTION FAILED");
          this.props.setIsConnecting(false);
          this.props.addLog(error);
        });
      }
    }).catch((error: any) => {
      this.sendFirmwareError(error);
      this.sendFirmwareError();
    });
  }

  private updateFirmwareStatus(event: any, error: any, response: any) {
    if (response.updateStarted) {
      this.setState({
        outputText: [...this.state.outputText, "[INFO] Started firmware update process..."]
      });
    } else if (response.isUpdating) {
      const updatedOutput: string[] = this.state.outputText;
      if (typeof response.updateStagePercent !== "undefined") {
        updatedOutput.pop();
        const percentComplete: number = parseFloat(response.updateStagePercent.toFixed(3));

        this.setState({updateProgress: percentComplete, 
                       updateText: `${response.updateStageMessage} - (${(percentComplete * 100).toFixed(1)}%)`
                      });
        
        updatedOutput.push(`[INFO] (${(percentComplete * 100).toFixed(1)}%) ${response.updateStageMessage}`);
      } else if (typeof response.updateStageMessage !== "undefined") {
        if (this._lastMessage !== response.updateStageMessage) {
          updatedOutput.push(`[INFO] (0.0%) ${response.updateStageMessage}`);
        }
      }
      this._lastMessage = response.updateStageMessage;
      this.setState({outputText: updatedOutput});
    }
    this.scrollToBottom();
  }

  private sendFirmwareError(error?: string) {
    const msg: string = "[ERROR] " + (typeof error !== "undefined" ? error : "Error loading firmware. Please disconnect the SPARK MAX controller, and try again.");
    this.setState({
      outputText: [...this.state.outputText, msg]
    });
    this.setState({loadingFirmware: false, updateProgress: 0});
    this.props.setIsConnecting(false);
    this.props.updateConnectionStatus(false, "DISCONNECTED");
    this.scrollToBottom();
  }

  private isOldFirmware(current: string, other: string): boolean {
    const curVer = current.toString().split(".");
    const othVer = other.toString().split(".");

    for(let i = 0; i < (Math.max(curVer.length, othVer.length)); i++){

      if(Number(curVer[i]) < Number(othVer[i])){
        return true;
      }

      if(curVer[i] !== othVer[i]){
        break;
      }
    }
    return false;
  }

  private scrollToBottom() {
    const console = document.getElementById("firmware-console");
    if (console !== null) {
      console.scrollTop = console.scrollHeight;
    }
  }
}

export function mapStateToProps(state: IApplicationState) {
  return {
    deviceId: getSelectedDeviceId(state),
    connected: isSelectedDeviceConnected(state),
  };
}

export function mapDispatchToProps(dispatch: SparkDispatch) {
  return {
    setIsConnecting: (connecting: boolean) => dispatch(updateSelectedDeviceIsProcessing(connecting)),
    updateConnectionStatus: (connected: boolean, status: string) =>
      dispatch(updateSelectedDeviceProcessStatus(connected, status)),
    addLog: (log: string) => dispatch(addLog(log)),
    setCurrentConfig: (config: MotorConfiguration) => dispatch(setSelectedDeviceMotorConfig(config)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FirmwareTab);