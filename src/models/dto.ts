import {LegendPosition} from "../display/display-interfaces";
import {TelemetryStreamResponseDto} from "../../public/proto-gen";

export * from "./proto-gen/SPARK-MAX-Types_dto_pb";
export * from "./proto-gen/SPARK-MAX-Commands_dto_pb";
export * from "./dto-utils";

export interface SignalDto {
  id: number;
  name: string;
  units: string;
  expectedMin: number;
  expectedMax: number;
  deviceId: number;
}

export interface TelemetryDataItemDto {
  id: number;
  deviceId: number;
  value: number;
  timestamp_ms: number;
  name: string;
  units: string;
  expectedMin: number;
  expectedMax: number;
  updateRate_ms: number;
}

export interface TelemetryListResponseDto {
  signalsAvailable: SignalDto[];
}

export interface DisplaySettingsDto {
  timeSpan: number;
  singleChart: boolean;
  showLegend: boolean;
  legendPosition: LegendPosition;
}

export interface DisplayConfigDto {
  settings: DisplaySettingsDto;
  devices: {[deviceId: number]: DisplayDeviceDto};
}

export interface DisplayDeviceDto {
  quickBar: number[];
  signals: {[signalId: number]: DisplayDeviceSignalDto};
}

export interface DisplayDeviceSignalDto {
  autoScaled: boolean;
  min: number;
  max: number;
}

export interface ISignalDestinationDto {
  deviceId: string;
  signalId: number;
}

export enum TelemetryEventType {
  Start = "start",
  Stop = "stop",
  Error = "error",
  Data = "data",
}

export interface TelemetryStartEvent {
  type: TelemetryEventType.Start;
}

export interface TelemetryStopEvent {
  type: TelemetryEventType.Stop;
}

export interface TelemetryDataEvent {
  type: TelemetryEventType.Data;
  data: TelemetryStreamResponseDto[];
}

export interface TelemetryErrorEvent {
  type: TelemetryEventType.Error;
  error: any;
}

export type TelemetryEvent = TelemetryStartEvent | TelemetryStopEvent | TelemetryDataEvent | TelemetryErrorEvent;
