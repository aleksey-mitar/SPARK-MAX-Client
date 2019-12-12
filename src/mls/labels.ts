const labels = {
  "lbl_device_not_configured": "Not Configured",
  "lbl_device_invalid_can_id": "CAN ID overlaps with another device on the bus",
  "lbl_interface": "Interface",
  "lbl_device_id": "Device ID",
  "lbl_device_name": "Device Name",
  "lbl_driver_name": "Driver Name",
  "lbl_connected": "Connected",
  "lbl_not_connected": "Not Connected",
  "lbl_identify": "Identify",
  "lbl_rescan": "Rescan",
  "lbl_status": "Status",
  "lbl_global_config_error": "A device is not configured",
  "lbl_disconnect": "Disconnect",
  "lbl_connect": "Connect",
  "lbl_console": "Console",
  "lbl_show_less": "Show Less",
  "lbl_show_more": "Show More",
  "lbl_id": "ID",
  "lbl_no_devices_uc": "NO DEVICES",
  "lbl_hide_details": "Hide Details",
  "lbl_show_details": "Show Details",
  "lbl_close": "Close",
  "lbl_apply": "Apply",
  "lbl_overwrite": "Overwrite",
  "lbl_create_dots": "Create...",
  "lbl_rename_dots": "Rename...",
  "lbl_remove": "Remove",
  "lbl_spark_max_client": "SPARK MAX Client",
  "lbl_spark_max_client_info": "A way to update, configure, and test your SPARK MAX Motor Controller.",
  "lbl_spark_max_client_copyright": "Copyright © 2019 REV Robotics LLC (support@revrobotics.com) under Apache License v2.0",
  "lbl_server_version": "Server Version",
  "lbl_client_version": "Client Version",
  "lbl_normally_closed": "Normally Closed",
  "lbl_normally_open": "Normally Open",
  "lbl_coast": "Coast",
  "lbl_brake": "Brake",
  "lbl_select_configuration": "Select Configuration",
  "lbl_limit_switch": "Limit Switch",
  "lbl_forward_limit": "Forward Limit",
  "lbl_reverse_limit": "Reverse Limit",
  "lbl_soft_limits": "Soft Limits",
  "lbl_ramp_rate": "Ramp Rate",
  "lbl_enabled": "Enabled",
  "lbl_disabled": "Disabled",
  "lbl_save_configuration": "Save Configuration",
  "lbl_restore_factory_defaults": "Restore Factory Defaults",
  "lbl_create_new_configuration": "Create New Configuration",
  "lbl_rename_configuration": "Rename Configuration",
  "lbl_enter_name": "Enter Name",
  "lbl_enter_new_name": "Enter New Name",
  "lbl_create": "Create",
  "lbl_cancel": "Cancel",
  "lbl_rename": "Rename",
  "lbl_yes_update": "Yes, Update",
  "lbl_yes_quit_install": "Yes, Quit And Install",
  "lbl_okay": "Okay",
  "lbl_application_logs": "Application Logs",
  "lbl_view_application_logs": "View Application Logs",
  "lbl_no_application_logs": "There are currently no application logs.",
  "lbl_troubleshooting": "Troubleshooting",
  "lbl_documentation": "Documentation",
  "lbl_spark_max_java_api": "SPARK MAX Java API",
  "lbl_spark_max_cpp_api": "SPARK MAX C++ API",
  "lbl_spark_max_code_samples": "SPARK MAX Code Samples",
  "lbl_check_for_updates": "Check for Updates",
  "lbl_download_update": "Downloading Update (${bytesPerSecond}mb/s - ${transferred}mb total)",
  "lbl_how_to": "How to",
  "lbl_loading_dots": "Loading...",
  "lbl_load_firmware": "Load Firmware",
  "lbl_latest_firmware": "Latest Firmware",
  "lbl_not_configured": "Not Configured",
  "lbl_pid_profile": "PID Profile",
  "lbl_p_uc": "P",
  "lbl_i_uc": "I",
  "lbl_d_uc": "D",
  "lbl_f_uc": "F",
  "lbl_update_pidf_configuration": "Update PIDF Configuration",
  "lbl_percent": "Percent",
  "lbl_time": "Time",
  "lbl_velocity": "Velocity",
  "lbl_position": "Position",
  "lbl_motor_output": "Motor Output",
  "lbl_stop": "Stop",
  "lbl_run": "Run",
  "lbl_save_pidf": "Save PIDF",
  "lbl_device": "Device",
  "lbl_can_id": "CAN ID",
  "lbl_firmware": "Firmware",
  "lbl_update": "Update",
  "lbl_scan_bus": "Scan Bus",
  "lbl_status_loading": "LOADING...",
  "lbl_status_set_configuration": "SETTING CONFIGURATION...",
  "lbl_status_connected": "CONNECTED",
  "lbl_status_connecting": "CONNECTING...",
  "lbl_status_disconnecting": "DISCONNECTING...",
  "lbl_status_connection_failed": "CONNECTION FAILED",
  "lbl_status_searching": "SEARCHING...",
  "lbl_status_search_failed": "SEARCH FAILED",
  "lbl_status_loading_firmware": "LOADING FIRMWARE...",
  "lbl_status_scanning_can_bus": "SCANNING CAN BUS",
  "lbl_status_getting_parameters": "GETTING PARAMETERS...",
  "lbl_status_failed_to_get_parameters": "FAILED TO GET PARAMETERS",
  "lbl_status_burning_parameters": "BURNING PARAMETERS...",
  "lbl_status_resetting": "RESETTING...",
  "lbl_status_syncing": "SYNCING...",
  "lbl_status_failed_to_sync": "FAILED TO SYNC...",
  "lbl_yes": "Yes",
  "lbl_no": "No",
  "lbl_ok": "OK",
  "lbl_problems_during_startup": "Problems During Startup",
  "lbl_update_old_firmware": "Open Network Tab & Scan Bus",
  "lbl_firmware_loading_progress": "$message - (${progress}%)",
  "lbl_unnamed": "Unnamed",
  "lbl_basic_tab": "Basic",
  "lbl_advanced_tab": "Advanced",
  "lbl_run_tab": "Run",
  "lbl_network_tab": "Network",
  "lbl_help_tab": "Help",
  "lbl_about_tab": "About",
  "lbl_not_connected_lc": "not connected",
  "lbl_configuration_issue_lc": "configuration issue",
  "lbl_run_panel": "Run",
  "lbl_parameters_panel": "Parameters",
  "lbl_signals_panel": "Signals",
  "lbl_settings_panel": "Settings",
  "lbl_time_span": "Time Span",
  "lbl_show_single_chart": "Single Chart",
  "lbl_show_legend": "Show Legend",
  "lbl_legend_position": "Legend Position",
  "lbl_add_signal": "Add Signal",
  "lbl_delete_signal": "Delete Signal",
  "lbl_no_signal_selected_title": "No Signal Selected",
  "lbl_no_signal_selected_description": "Select a signal from the list on the left to see its details",
  "lbl_add_signal_title": "Signal Not Added",
  "lbl_add_signal_description": "Press on the button below to add this signal for the selected device",
  "lbl_auto_scaled": "Auto-scaled",
  "lbl_min": "Min",
  "lbl_max": "Max",
  "lbl_remove_from_quick_bar": "Remove from Quick Bar",
  "lbl_add_to_quick_bar": "Add to Quick Bar",
  "lbl_no_signals_added_title": "No Signals Added",
  "lbl_no_signals_added_description": "In order to start tracking device parameters add any signal and run device",
  "lbl_no_device_connected_title": "No Device Connected",
  "lbl_no_device_connected_description": "In order to run device, it should be connected. Choose device on the top of the window and press \"Connect\"",
  "lbl_no_signals_title": "No Signals",
  "lbl_no_signals_description": "No signals available for the selected device",
  "lbl_device_blocked_title": "Configuration Issue",
  "lbl_device_blocked_description": "Selected device has a configuration issue. Fix it to continue working with the device. Look for details under \"i\" icon on the top of the window",
  "lbl_quick_bar": "Quick Bar",
  "lbl_pidf": "PIDF",
  "lbl_control_mode": "Control Mode",
  "lbl_set_point": "Setpoint",
  "lbl_start_device": "Run",
  "lbl_stop_device": "Stop",
  "lbl_pause_devices": "Stop all running devices with possibility to restart by a single click",
  "lbl_resume_devices": "Run all paused devices",
  "lbl_stop_all": "Stop All",
  "lbl_stop_all_tooltip": "Stop all running devices (Esc)",
  "lbl_device_loading": "Wait until device data is loaded",
  "lbl_search": "Search",
  "lbl_parameter_name": "Parameter Name",
  "lbl_value": "Value",
  "lbl_search_no_results_title": "No Search Results Found",
  "lbl_clear": "Clear",
  "lbl_dfu_devices_title": "Devices in Recovery Mode",
  "lbl_in_ram": "In RAM",
  "lbl_configuration_group:template": "Templates",
  "lbl_configuration_group:user-defined": "User Defined",
};

export default labels;

