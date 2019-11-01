import {constant} from "lodash";
import * as React from "react";
import {IApplicationState, DisplaySettings, ISignalInstanceState, ISignalState} from "../store/state";
import {connect} from "react-redux";
import {DataSet, WaveformChart, WaveformEngineDisplay, WaveformScale} from "../display";
import {querySignalsWithInstances} from "../store/selectors";
import {NonIdealState} from "@blueprintjs/core";
import {getDataSource} from "../store/data-stream";
import {ReactNode} from "react";

interface IProps {
  className?: string;
  settings: DisplaySettings;
  signalsWithInstances: Array<[ISignalState, ISignalInstanceState]>;
}

/**
 * This component displays chart(s) with all requested signals
 */
const RunDisplay = (props: IProps) => {
  const {className, settings, signalsWithInstances} = props;

  if (signalsWithInstances.length === 0) {
    return <NonIdealState className={className}
                          icon="timeline-line-chart"
                          title={tt("lbl_no_signals_added_title")}
                          description={tt("lbl_no_signals_added_description")}/>
  }

  let children: ReactNode;
  // Display single chart if user wants to show only single chart
  // or if number of signals > 2 (anyway, in this case displaying of such number of charts will be inconvenient).
  if (settings.singleChart || signalsWithInstances.length > 2) {
    children = (
      <WaveformChart timeSpan={settings.timeSpan}
                     legendPosition={settings.legendPosition}
                     showLegend={settings.showLegend}>

        {
          signalsWithInstances.map(([signal, instance]) => (
            <React.Fragment key={instance.scaleId}>
              <WaveformScale id={instance.scaleId}
                             autoScale={instance.autoScaled}
                             suggestedMin={signal.expectedMin}
                             suggestedMax={signal.expectedMax}
                             min={instance.min}
                             max={instance.max}
                             color={instance.style.color}/>
              <DataSet scaleId={instance.scaleId}
                       dataSource={getDataSource(instance.virtualDeviceId, instance.signalId)}
                       label={`ID ${signal.deviceId}, ${signal.name}, ${signal.units}`}
                       color={instance.style.color}/>
            </React.Fragment>
          ))
        }
      </WaveformChart>
    );
  } else {
    children = (
      signalsWithInstances.map(([signal, instance]) =>
        <WaveformChart key={instance.scaleId}
                       timeSpan={settings.timeSpan}
                       legendPosition={settings.legendPosition}
                       showLegend={settings.showLegend}>
          <WaveformScale id={instance.scaleId}
                         autoScale={instance.autoScaled}
                         suggestedMin={signal.expectedMin}
                         suggestedMax={signal.expectedMax}
                         min={instance.min}
                         max={instance.max}
                         color={instance.style.color}/>
          <DataSet scaleId={instance.scaleId}
                   dataSource={getDataSource(instance.virtualDeviceId, instance.signalId)}
                   label={`ID ${signal.deviceId}, ${signal.name}, ${signal.units}`}
                   color={instance.style.color}/>
        </WaveformChart>
      )
    );
  }

  return (
    <WaveformEngineDisplay className={className}>
      {children}
    </WaveformEngineDisplay>
  );
};

function mapStateToProps(state: IApplicationState) {
  return {
    settings: state.display.settings,
    signalsWithInstances: querySignalsWithInstances(state),
  };
}

export default connect(mapStateToProps, constant({}))(RunDisplay);
