import {Alert, Button, FormGroup, NumericInput, Slider, Switch} from "@blueprintjs/core";
import * as React from "react";
import {connect} from "react-redux";
import {MotorTypeSelect} from "../components/MotorTypeSelect";
import SparkManager, {IServerResponse} from "../managers/SparkManager";
import MotorConfiguration, {REV_BRUSHED, REV_BRUSHLESS, getFromID as getMotorFromID} from "../models/MotorConfiguration";
import {ApplicationActions, IApplicationState, ISetBurnedMotorConfig, ISetMotorConfig} from "../store/types";
import Sensor, {getFromID as getSensorFromID} from "../models/Sensor";
import {SensorTypeSelect} from "../components/SensorTypeSelect";
import {ConfigParameter} from "../models/ConfigParameter";
import PopoverHelp from "../components/PopoverHelp";
import {Dispatch} from "redux";
import {setBurnedMotorConfig, setMotorConfig} from "../store/actions";

interface IProps {
  connected: boolean,
  motorConfig: MotorConfiguration,
  burnedConfig: MotorConfiguration,
  paramResponses: IServerResponse[],
  setCurrentConfig: (config: MotorConfiguration) => ISetMotorConfig,
  setBurnedConfig: (config: MotorConfiguration) => ISetBurnedMotorConfig
}

interface IState {
  inputRampLimit: number,
  currentLimitEnabled: boolean,
  currentChopEnabled: boolean,
  outputRampLimit: number,
  rampRateEnabled: boolean,
  savingConfig: boolean,
  slaveMode: boolean,
  updateRequested: boolean,
}

class AdvancedTab extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      currentLimitEnabled: false,
      inputRampLimit: 0,
      currentChopEnabled: false,
      outputRampLimit: 0,
      rampRateEnabled: false,
      savingConfig: false,
      slaveMode: false,
      updateRequested: false,
    };

    this.openConfirmModal = this.openConfirmModal.bind(this);
    this.closeConfirmModal = this.closeConfirmModal.bind(this);
    this.updateConfiguration = this.updateConfiguration.bind(this);

    this.changeMotorType = this.changeMotorType.bind(this);
    this.changeSensorType = this.changeSensorType.bind(this);
    this.changeCanID = this.changeCanID.bind(this);
    this.changeCurrentLimitEnabled = this.changeCurrentLimitEnabled.bind(this);
    this.changeIdleMode = this.changeIdleMode.bind(this);
    this.changeCurrentLimit = this.changeCurrentLimit.bind(this);
    this.changeDeadband = this.changeDeadband.bind(this);
    this.changeForwardLimitEnabled = this.changeForwardLimitEnabled.bind(this);
    this.changeReverseLimitEnabled = this.changeReverseLimitEnabled.bind(this);
    this.changeForwardPolarity = this.changeForwardPolarity.bind(this);
    this.changeReversePolarity = this.changeReversePolarity.bind(this);
    this.changeSlaveMode = this.changeSlaveMode.bind(this);
    this.changeMasterID = this.changeMasterID.bind(this);
    this.changeRampRateEnabled = this.changeRampRateEnabled.bind(this);
    this.changeRampRate = this.changeRampRate.bind(this);
    this.changeCurrentChopEnabled = this.changeCurrentChopEnabled.bind(this);
    this.changeCurrentChop = this.changeCurrentChop.bind(this);
    this.changeOutputRatio = this.changeOutputRatio.bind(this);

    this.sanitizeValue = this.sanitizeValue.bind(this);
    this.provideDefault = this.provideDefault.bind(this);
  }

  public componentDidMount(): void {
    if (this.props.connected) {
      this.changeMotorType(this.props.motorConfig.type === 1 ? REV_BRUSHLESS : REV_BRUSHED);
      this.setState({currentChopEnabled: this.props.motorConfig.currentChop > 0});
    }
  }

  public componentDidUpdate(prevProps: Readonly<IProps>): void {
    if (prevProps.connected !== this.props.connected) {
      this.componentDidMount();
    }
  }

  public render() {
    const {connected, burnedConfig, motorConfig} = this.props;
    const {currentChopEnabled, rampRateEnabled, savingConfig, slaveMode, updateRequested} = this.state;
    const activeMotorType = getMotorFromID(motorConfig.type);
    const canID = motorConfig.canID;
    const isCoastMode = motorConfig.idleMode === 0;
    const sensorType = motorConfig.sensorType;
    const currentChop = motorConfig.currentChop;
    const currentChopCycles = motorConfig.currentChopCycles;
    const deadband = motorConfig.inputDeadband;
    const outputRatio = motorConfig.outputRatio;
    const rampRate = motorConfig.rampRate;
    const masterID = motorConfig.followerID;
    const forwardLimitEnabled = motorConfig.hardLimitSwitchForwardEnabled;
    const reverseLimitEnabled = motorConfig.hardLimitSwitchReverseEnabled;
    const forwardPolarity = motorConfig.limitSwitchForwardPolarity;
    const reversePolarity = motorConfig.limitSwitchReversePolarity;

    // Motor Type
    const typeModified: boolean = motorConfig.type !== burnedConfig.type;
    // Can ID
    const canModified: boolean = motorConfig.canID !== burnedConfig.canID;
    const canResponse: IServerResponse = this.getParamResponse(ConfigParameter.kCanID);
    const canError: boolean = canResponse.status === 4;

    // Idle Mode
    const idleModified: boolean = motorConfig.idleMode !== burnedConfig.idleMode;

    // Motor Deadband
    const deadbandModified: boolean = motorConfig.inputDeadband.toFixed(4) !== burnedConfig.inputDeadband.toFixed(4);
    const deadbandResponse: IServerResponse = this.getParamResponse(ConfigParameter.kInputDeadband);
    const deadbandError: boolean = deadbandResponse.status === 4;

    // Sensor Type
    const sensorModified: boolean = motorConfig.sensorType !== burnedConfig.sensorType;

    // Output Ratio
    const outputModified: boolean = motorConfig.outputRatio !== burnedConfig.outputRatio;

    // Forward Limit Switch
    const forwardEnabledModified: boolean = motorConfig.hardLimitSwitchForwardEnabled !== burnedConfig.hardLimitSwitchForwardEnabled;

    // Reverse Limit Switch
    const reverseEnabledModified: boolean = motorConfig.hardLimitSwitchReverseEnabled !== burnedConfig.hardLimitSwitchReverseEnabled;

    // Forward Polarity
    const forwardPolarityModified: boolean = motorConfig.limitSwitchForwardPolarity !== burnedConfig.limitSwitchForwardPolarity;

    // Reverse Polarity
    const reversePolarityModified: boolean = motorConfig.limitSwitchReversePolarity !== burnedConfig.limitSwitchReversePolarity;

    // Current Chop
    const chopModified: boolean = motorConfig.currentChop !== burnedConfig.currentChop;
    const chopResponse: IServerResponse = this.getParamResponse(ConfigParameter.kCurrentChop);
    const chopError: boolean = chopResponse.status === 4;

    // Ramp Rate
    const rampModified: boolean = motorConfig.rampRate !== burnedConfig.rampRate;

    // Master ID
    const masterModified: boolean = motorConfig.followerID !== burnedConfig.followerID;

    return (
      <div className="advanced">
        <Alert isOpen={updateRequested} cancelButtonText="Cancel" confirmButtonText="Yes, Update" intent="success" onCancel={this.closeConfirmModal} onClose={this.closeConfirmModal} onConfirm={this.updateConfiguration}>
          Are you sure you want to update the configuration of your SPARK controller to a {activeMotorType.name} motor?
        </Alert>
        <div className="form">
          <FormGroup
            label="Select Motor Type"
            labelFor="advanced-motor-type"
            className={(typeModified ? "modified" : "") + " form-group-two-fifths"}
          >
            <MotorTypeSelect
              activeConfig={activeMotorType}
              connected={connected}
              onMotorSelect={this.changeMotorType}
            />
          </FormGroup>
          <FormGroup
            label="Current Chop"
            labelFor="advanced-has-limit"
            className="form-group-fifth"
          >
            <Switch checked={currentChopEnabled} disabled={!connected} label={currentChopEnabled ? "On" : "No Limit"} onChange={this.changeCurrentLimitEnabled} />
          </FormGroup>
          <FormGroup
            label={<PopoverHelp enabled={!chopError} title={"Chop Value"} content={`Your requested value of ${chopResponse.requestValue} was invalid, so the SPARK MAX controller sent back a value of ${chopResponse.responseValue}.`}/>}
            labelFor="advanced-current-limit"
            className={(chopModified ? "modified" : "") + " form-group-fifth"}
          >
            <NumericInput id="advanced-current-limit" value={currentChop} disabled={!currentChopEnabled} onFocus={this.provideDefault} onBlur={this.sanitizeValue} onValueChange={this.changeCurrentLimit} className={chopError ? "field-error" : ""} stepSize={0.5} min={10} max={125}/>
          </FormGroup>
          <FormGroup
            label={"Chop Cycles"}
            labelFor="advanced-chop-cycles-id"
            className={"form-group-fifth"}
          >
            <NumericInput id="advanced-chop-cycles-id" disabled={!currentChopEnabled} value={currentChopCycles} min={0} max={100}/>
          </FormGroup>
        </div>
        <div className="form">
          <FormGroup
            label={<PopoverHelp enabled={!canError} title={"CAN ID"} content={`Your requested value of ${canResponse.requestValue} was invalid, so the SPARK MAX controller sent back a value of ${canResponse.responseValue}.`}/>}
            labelFor="advanced-can-id"
            className={(canModified ? "modified" : "") + " form-group-quarter"}
          >
            <NumericInput id="advanced-can-id" disabled={!connected} value={canID} onValueChange={this.changeCanID} min={0} max={24} className={canError ? "field-error" : ""}/>
          </FormGroup>
          <FormGroup
            label="Idle Mode"
            labelFor="advanced-idle-mode"
            className={(idleModified ? "modified" : "") + " form-group-quarter"}
          >
            <Switch checked={isCoastMode} disabled={!connected} label={isCoastMode ? "Coast" : "Brake"} onChange={this.changeIdleMode} />
          </FormGroup>
          <FormGroup
            label={<PopoverHelp enabled={!deadbandError} title={"Motor Deadband"} content={`Your requested value of ${deadbandResponse.requestValue} was invalid, so the SPARK MAX controller sent back a value of ${deadbandResponse.responseValue}.`}/>}
            labelFor="advanced-deadband"
            className={(deadbandModified ? "modified" : "") + " form-group-half"}
          >
            <Slider initialValue={deadband} disabled={!connected} value={deadband} min={0} max={0.3} stepSize={0.01} onChange={this.changeDeadband} className={deadbandError ? "field-error" : ""}/>
          </FormGroup>
        </div>
        <div className="form">
          <FormGroup
            label="Select Sensor Type"
            labelFor="advanced-motor-type"
            className={(sensorModified ? "modified" : "") + " form-group-quarter"}
          >
            <SensorTypeSelect
              activeSensor={getSensorFromID(sensorType)}
              connected={connected}
              onSensorSelect={this.changeSensorType}
              disabled={motorConfig.type === 1}
            />
          </FormGroup>
          <FormGroup
            label="Output Ratio"
            labelFor="advanced-can-id"
            className={(outputModified ? "modified" : "") + " form-group-quarter"}
          >
            <NumericInput id="advanced-can-id" disabled={!connected} value={outputRatio} onFocus={this.provideDefault} onBlur={this.sanitizeValue} onValueChange={this.changeOutputRatio} min={0} max={24}/>
          </FormGroup>
          <FormGroup
            label="Forward Limit Switch Enabled"
            labelFor="advanced-is-slave"
            className={(forwardEnabledModified ? "modified" : "") + " form-group-quarter"}
          >
            <Switch checked={forwardLimitEnabled} disabled={!connected} label={forwardLimitEnabled ? "Enabled" : "Disabled"} onChange={this.changeForwardLimitEnabled} />
          </FormGroup>
          <FormGroup
            label="Reverse Limit Switch Enabled"
            labelFor="advanced-is-slave"
            className={(reverseEnabledModified ? "modified" : "") + " form-group-quarter"}
          >
            <Switch checked={reverseLimitEnabled} disabled={!connected} label={reverseLimitEnabled ? "Enabled" : "Disabled"} onChange={this.changeReverseLimitEnabled} />
          </FormGroup>
        </div>
        <div className="form">
          <FormGroup
            label="Forward Limit Switch Polarity"
            labelFor="advanced-is-slave"
            className={(forwardPolarityModified ? "modified" : "") + " form-group-quarter"}
          >
            <Switch checked={forwardPolarity} disabled={!connected} label={forwardPolarity ? "Normally Open" : "Normally Closed"} onChange={this.changeForwardPolarity} />
          </FormGroup>
          <FormGroup
            label="Reverse Limit Switch Polarity"
            labelFor="advanced-is-slave"
            className={(reversePolarityModified ? "modified" : "") + " form-group-quarter"}
          >
            <Switch checked={reversePolarity} disabled={!connected} label={reversePolarity ? "Normally Open" : "Normally Closed"} onChange={this.changeReversePolarity} />
          </FormGroup>
        </div>
        <div className="form">
          <FormGroup
            label="Ramp Rate"
            labelFor="advanced-output-limit"
            className="form-group-quarter"
          >
            <Switch checked={rampRateEnabled} disabled={!connected} label={rampRateEnabled ? "Enabled" : "Disabled"} onChange={this.changeRampRateEnabled} />
          </FormGroup>
          <FormGroup
            label="Rate (seconds to full speed)"
            labelFor="advanced-output-rate"
            className={(rampModified ? "modified" : "") + " form-group-quarter"}
          >
            <NumericInput id="advanced-output-rate" value={rampRate} disabled={!rampRateEnabled} onFocus={this.provideDefault} onBlur={this.sanitizeValue} onValueChange={this.changeRampRate} min={0} max={1024}/>
          </FormGroup>
          <FormGroup
            label="Slave Mode"
            labelFor="advanced-is-slave"
            className="form-group-quarter"
          >
            <Switch checked={slaveMode} disabled={!connected} label={slaveMode ? "Enabled" : "Disabled"} onChange={this.changeSlaveMode} />
          </FormGroup>
          <FormGroup
            label="Master ID"
            labelFor="advanced-master-id"
            className={(masterModified ? "modified" : "") + " form-group-quarter"}
          >
            <NumericInput id="advanced-master-id" value={masterID} disabled={!slaveMode} onValueChange={this.changeMasterID} min={0} max={24}/>
          </FormGroup>
        </div>
        <div className="form">
          <Button className="rev-btn" disabled={!connected} loading={savingConfig} onClick={this.openConfirmModal}>Update Configuration</Button>
        </div>
      </div>
    );
  }

  public changeCanID(id: number) {
    SparkManager.setAndGetParameter(ConfigParameter.kCanID, id).then((res: IServerResponse) => {
      this.props.motorConfig.canID = res.responseValue as number;
      this.props.paramResponses[ConfigParameter.kCanID] = res;
      this.forceUpdate();
    });
  }

  public changeMotorType(motorType: MotorConfiguration) {
    this.props.motorConfig.type = motorType.type;
    if (motorType.type === 1) {
      this.props.motorConfig.sensorType = 1;
    }
    this.forceUpdate();
  }

  public changeSensorType(sensorType: Sensor) {
    this.props.motorConfig.sensorType = sensorType.id;
    this.forceUpdate();
  }

  public changeCurrentLimitEnabled() {
    const newEnabled: boolean = !this.state.currentChopEnabled;
    if (!newEnabled) {
      SparkManager.setAndGetParameter(ConfigParameter.kCurrentChop, 0).then((chopRes: IServerResponse) => {
        this.props.motorConfig.currentChop = chopRes.responseValue as number;
        this.props.paramResponses[ConfigParameter.kCurrentChop] = chopRes;
        SparkManager.setAndGetParameter(ConfigParameter.kCurrentChopCycles, 0).then((chopCycleRes: IServerResponse) => {
          this.props.motorConfig.currentChopCycles = chopCycleRes.responseValue as number;
          this.props.paramResponses[ConfigParameter.kCurrentChopCycles] = chopCycleRes;
        });
      });
    }
    this.setState({currentChopEnabled: newEnabled});
  }

  public changeIdleMode() {
    const prevMode: number = this.props.motorConfig.idleMode;
    this.props.motorConfig.idleMode = prevMode === 0 ? 1 : 0;
    this.forceUpdate();
  }

  public changeCurrentLimit(value: number) {
    SparkManager.setAndGetParameter(ConfigParameter.kCurrentChop, value).then((res: IServerResponse) => {
      this.props.motorConfig.currentChop = res.responseValue as number;
      this.props.paramResponses[ConfigParameter.kCurrentChop] = res;
      this.forceUpdate();
    });
  }

  public changeDeadband(value: number) {
    SparkManager.setAndGetParameter(ConfigParameter.kInputDeadband, value).then((res: IServerResponse) => {
      this.props.motorConfig.inputDeadband = res.responseValue as number;
      this.props.paramResponses[ConfigParameter.kInputDeadband] = res;
      console.log(res);
      this.forceUpdate();
    });
  }

  public changeForwardLimitEnabled() {
    this.props.motorConfig.hardLimitSwitchForwardEnabled = !this.props.motorConfig.hardLimitSwitchForwardEnabled;
    this.forceUpdate();
  }

  public changeReverseLimitEnabled() {
    this.props.motorConfig.hardLimitSwitchReverseEnabled = !this.props.motorConfig.hardLimitSwitchReverseEnabled;
    this.forceUpdate();
  }

  public changeForwardPolarity() {
    const prevValue = this.props.motorConfig.limitSwitchForwardPolarity;
    this.props.motorConfig.limitSwitchForwardPolarity = !prevValue;
    this.forceUpdate();
  }

  public changeReversePolarity() {
    const prevValue = this.props.motorConfig.limitSwitchReversePolarity;
    this.props.motorConfig.limitSwitchReversePolarity = !prevValue;
    this.forceUpdate();
  }

  public openConfirmModal() {
    this.setState({updateRequested: true});
  }

  public closeConfirmModal() {
    this.setState({updateRequested: false});
  }

  public changeSlaveMode() {
    this.setState({slaveMode: !this.state.slaveMode});
  }

  public changeMasterID(value: number) {
    this.props.motorConfig.followerID = value;
    this.forceUpdate();
  }

  public changeRampRateEnabled() {
    const newEnabled: boolean = !this.state.rampRateEnabled;
    if (!newEnabled) {
      this.props.motorConfig.rampRate = 0;
    }
    this.setState({rampRateEnabled: newEnabled});
  }

  public changeRampRate(value: number) {
    this.props.motorConfig.rampRate = 1 / value;
    this.forceUpdate();
  }

  public changeCurrentChopEnabled() {
    const newEnabled: boolean = !this.state.currentChopEnabled;
    if (!newEnabled) {
      this.props.motorConfig.currentChop = 0;
      this.forceUpdate();
    }
    this.setState({currentChopEnabled: newEnabled});
  }

  public changeCurrentChop(value: number) {
    this.props.motorConfig.currentChop = value;
    this.forceUpdate();
  }

  public changeOutputRatio(value: number) {
    this.props.motorConfig.outputRatio = value;
    this.forceUpdate();
  }

  private updateConfiguration() {
    this.setState({savingConfig: true});
    SparkManager.burnFlash().then(() => {
      SparkManager.getConfigFromParams().then((config: MotorConfiguration) => {
        this.props.setCurrentConfig(config);
        this.props.setBurnedConfig(new MotorConfiguration(config.name, config.type).fromJSON(config.toJSON()));
        this.setState({savingConfig: false});
      }).catch((error: any) => {
        console.log(error);
        this.setState({savingConfig: false});
      });
    }).catch((error: any) => {
      this.setState({savingConfig: false});
      console.log(error);
    });
  }

  private sanitizeValue(event: any) {
    const decimalValue: number = parseFloat(event.target.value);
    if (decimalValue !== 0) {
      event.target.value = decimalValue;
    }
  }

  private provideDefault(event: any) {
    const decimalValue: number = parseFloat(event.target.value);
    if (decimalValue === 0) {
      event.target.value = "0.0";
    }
  }

  private getParamResponse(id: number): IServerResponse {
    if (typeof this.props.paramResponses[id] !== "undefined") {
      return this.props.paramResponses[id];
    } else {
      return {requestValue: "", responseValue: "", status: 0, type: 0};
    }
  }
}

export function mapStateToProps(state: IApplicationState) {
  return {
    connected: state.isConnected,
    motorConfig: state.currentConfig,
    burnedConfig: state.burnedConfig,
    paramResponses: state.paramResponses
  };
}

export function mapDispatchToProps(dispatch: Dispatch<ApplicationActions>) {
  return {
    setCurrentConfig: (config: MotorConfiguration) => dispatch(setMotorConfig(config)),
    setBurnedConfig: (config: MotorConfiguration) => dispatch(setBurnedMotorConfig(config))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedTab);