import {ActionCreator} from "redux";
import MotorConfiguration from "../models/MotorConfiguration";
import {
  ISetConnectedDevice,
  ISetIsConnecting, ISetMotorConfig, ISetParameters,
  IUpdateConnectionStatus, SET_CONNECTED_DEVICE,
  SET_CONNECTING,
  SET_CONNECTION_STATUS, SET_MOTOR_CONFIG, SET_PARAMETERS
} from "./types";

export const updateConnectionStatus: ActionCreator<IUpdateConnectionStatus> = (isConnected: boolean, connectionStatus: string) => ({
  payload: {
    connectionStatus,
    isConnected
  },
  type: SET_CONNECTION_STATUS
});

export const setIsConnecting: ActionCreator<ISetIsConnecting> = (isConnecting: boolean) => ({
  payload: {
    isConnecting
  },
  type: SET_CONNECTING
});

export const setConnectedDevice: ActionCreator<ISetConnectedDevice> = (connectedDevice: string) => ({
  payload: {
    connectedDevice
  },
  type: SET_CONNECTED_DEVICE
});

export const setParameters: ActionCreator<ISetParameters> = (parameters: number[]) => ({
  payload: {
    parameters
  },
  type: SET_PARAMETERS
});

export const setMotorConfig: ActionCreator<ISetMotorConfig> = (config: MotorConfiguration) => ({
  payload: {
    config
  },
  type: SET_MOTOR_CONFIG
});