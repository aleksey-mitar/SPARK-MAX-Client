import {Button} from "@blueprintjs/core";
import * as React from "react";
import {connect} from "react-redux";
import {
  ApplicationActions, IAddLog,
  IApplicationState,
  ISetConnectedDevice,
  ISetIsConnecting, ISetMotorConfig,
  IUpdateConnectionStatus
} from "../store/types";
import SparkManager from "../managers/SparkManager";
import {Dispatch} from "redux";
import {addLog, setConnectedDevice, setIsConnecting, setMotorConfig, updateConnectionStatus} from "../store/actions";
import WebProvider from "../providers/WebProvider";
import MotorConfiguration from "../models/MotorConfiguration";

interface IProps {
  connected: boolean,
  setIsConnecting: (connecting: boolean) => ISetIsConnecting,
  updateConnectionStatus: (connected: boolean, status: string) => IUpdateConnectionStatus,
  setConnectedDevice: (device: string) => ISetConnectedDevice,
  setCurrentConfig: (cofig: MotorConfiguration) => ISetMotorConfig,
  addLog: (log: string) => IAddLog
}

interface IState {
  firmwareVersion: string,
  firmwarePath: string,
  outputText: string[],
  loadingFirmware: boolean,
  recoveryRequired: boolean
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
      recoveryRequired: false
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
        <div id="firmware-console">
          {outputText.map((line, index) => {
            return <p key={index}>{line}</p>;
          })}
        </div>
        <div id="firmware-bar">
          <span>Current Firmware: {firmwareVersion}</span>
          <span><Button className="rev-btn" loading={loadingFirmware} onClick={recoveryRequired ? this.loadFirmware : this.openFileDialog}>{recoveryRequired ? "Continue" : "Load Firmware"}</Button></span>
        </div>
      </div>
    );
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
        this.setState({loadingFirmware: false});
        this.scrollToBottom();
        SparkManager.discoverAndConnect().then((device: string) => {
          this.props.updateConnectionStatus(true, "CONNECTED");
          this.props.setIsConnecting(false);
          this.props.setConnectedDevice(device);
          setTimeout(() => {
            SparkManager.getConfigFromParams().then((config: MotorConfiguration) => {
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
    this.setState({loadingFirmware: false});
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
    connected: state.isConnected
  };
}

export function mapDispatchToProps(dispatch: Dispatch<ApplicationActions>) {
  return {
    setIsConnecting: (connecting: boolean) => dispatch(setIsConnecting(connecting)),
    updateConnectionStatus: (connected: boolean, status: string) => dispatch(updateConnectionStatus(connected, status)),
    addLog: (log: string) => dispatch(addLog(log)),
    setConnectedDevice: (device: string) => dispatch(setConnectedDevice(device)),
    setCurrentConfig: (config: MotorConfiguration) => dispatch(setMotorConfig(config)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FirmwareTab);