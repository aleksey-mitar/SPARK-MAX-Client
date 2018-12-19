import {Reducer} from "redux";
import {REV_BRUSHLESS} from "../models/MotorConfiguration";
import {
  ApplicationActions,
  IApplicationState,
  SET_CONNECTED_DEVICE,
  SET_CONNECTING,
  SET_CONNECTION_STATUS, SET_MOTOR_CONFIG, SET_PARAMETERS
} from "./types";

export const initialState: IApplicationState = {
  connectedDevice: "",
  connectionStatus: "NOT CONNECTED",
  currentConfig: REV_BRUSHLESS,
  isConnected: false,
  isConnecting: false,
  parameters: []
};

const reducer: Reducer<IApplicationState> = (state: IApplicationState = initialState, action: any) => {
  switch ((action as ApplicationActions).type) {
    case SET_CONNECTION_STATUS:
      return {...state, isConnected: action.payload.isConnected, connectionStatus: action.payload.connectionStatus};
    case SET_CONNECTING:
      return {...state, isConnecting: action.payload.isConnecting};
    case SET_CONNECTED_DEVICE:
      return {...state, connectedDevice: action.payload.connectedDevice};
    case SET_PARAMETERS:
      return {...state, parameters: action.payload.parameters};
    case SET_MOTOR_CONFIG:
      return {...state, currentConfig: action.payload.config};
    default:
      return state;
  }
};

export default reducer;