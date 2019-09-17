// package: sparkmax
// file: SPARK-MAX-Types.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export enum motorType {
    BRUSHED = 0,
    BRUSHLESS = 1,
}

export enum sensorType {
    NOSENSOR = 0,
    HALLSENSOR = 1,
    ENCODER = 2,
    SENSORLESS = 3,
}

export enum ctrlType {
    DUTYCYCLE = 0,
    VELOCITY = 1,
    VOLTAGE = 2,
    POSITION = 3,
}

export enum idleMode {
    COAST = 0,
    BRAKE = 1,
}

export enum inputMode {
    PWM = 0,
    CAN = 1,
}

export enum faultBits {
    BROWNOUT = 0,
    OVERCURRENT = 1,
    IWDTRESET = 2,
    MOTORFAULT = 3,
    SENSORFAULT = 4,
    STALL = 5,
    EEPROMCRC = 6,
    CANTX = 7,
    CANRX = 8,
    HASRESET = 9,
    DRVFAULT = 10,
    OTHERFAULT = 11,
    SOFTLIMITFWD = 12,
    SOFTLIMITREV = 13,
    HARDLIMITFWD = 14,
    HARDLIMITREV = 15,
}

export enum paramType {
    INT32 = 0,
    UINT32 = 1,
    FLOAT32 = 2,
    BOOL = 3,
}

export enum paramStatus {
    PARAMOK = 0,
    INVALIDID = 1,
    MISMATCHTYPE = 2,
    ACCESSMODE = 3,
    INVALID = 4,
    NOTIMPLEMENTEDDEPRECATED = 5,
}

export enum definedFollowerID {
    FOLLOWERDISABLED = 0,
    FOLLOWERCUSTOM = 25,
    FOLLOWERSPARKMAX = 26,
}

export enum followerSignMode {
    FOLLOWERNOSIGN = 0,
    FOLLOWERTWOSCOMP = 1,
    FOLLOWERSIGNMAG = 2,
}

export enum configParam {
    KCANID = 0,
    KINPUTMODE = 1,
    KMOTORTYPE = 2,
    KCOMMADVANCE = 3,
    KSENSORTYPE = 4,
    KCTRLTYPE = 5,
    KIDLEMODE = 6,
    KINPUTDEADBAND = 7,
    KFEEDBACKSENSORPID0 = 8,
    KFEEDBACKSENSORPID1 = 9,
    KPOLEPAIRS = 10,
    KCURRENTCHOP = 11,
    KCURRENTCHOPCYCLES = 12,
    KP_0 = 13,
    KI_0 = 14,
    KD_0 = 15,
    KF_0 = 16,
    KIZONE_0 = 17,
    KDFILTER_0 = 18,
    KOUTPUTMIN_0 = 19,
    KOUTPUTMAX_0 = 20,
    KP_1 = 21,
    KI_1 = 22,
    KD_1 = 23,
    KF_1 = 24,
    KIZONE_1 = 25,
    KDFILTER_1 = 26,
    KOUTPUTMIN_1 = 27,
    KOUTPUTMAX_1 = 28,
    KP_2 = 29,
    KI_2 = 30,
    KD_2 = 31,
    KF_2 = 32,
    KIZONE_2 = 33,
    KDFILTER_2 = 34,
    KOUTPUTMIN_2 = 35,
    KOUTPUTMAX_2 = 36,
    KP_3 = 37,
    KI_3 = 38,
    KD_3 = 39,
    KF_3 = 40,
    KIZONE_3 = 41,
    KDFILTER_3 = 42,
    KOUTPUTMIN_3 = 43,
    KOUTPUTMAX_3 = 44,
    KINVERTED = 45,
    KOUTPUTRATIO = 46,
    KSERIALNUMBERLOW = 47,
    KSERIALNUMBERMID = 48,
    KSERIALNUMBERHIGH = 49,
    KLIMITSWITCHFWDPOLARITY = 50,
    KLIMITSWITCHREVPOLARITY = 51,
    KHARDLIMITFWDEN = 52,
    KHARDLIMITREVEN = 53,
    KSOFTLIMITFWDEN = 54,
    KSOFTLIMITREVEN = 55,
    KRAMPRATE = 56,
    KFOLLOWERID = 57,
    KFOLLOWERCONFIG = 58,
    KSMARTCURRENTSTALLLIMIT = 59,
    KSMARTCURRENTFREELIMIT = 60,
    KSMARTCURRENTCONFIG = 61,
    KSMARTCURRENTRESERVED = 62,
    KMOTORKV = 63,
    KMOTORR = 64,
    KMOTORL = 65,
    KMOTORRSVD1 = 66,
    KMOTORRSVD2 = 67,
    KMOTORRSVD3 = 68,
    KENCODERCOUNTSPERREV = 69,
    KENCODERAVERAGEDEPTH = 70,
    KENCODERSAMPLEDELTA = 71,
    KENCODERINVERTED = 72,
    KENCODERRSVD1 = 73,
    KCLOSEDLOOPVOLTAGEMODE = 74,
    KCOMPENSATEDNOMINALVOLTAGE = 75,
    KSMARTMOTIONMAXVELOCITY_0 = 76,
    KSMARTMOTIONMAXACCEL_0 = 77,
    KSMARTMOTIONMINVELOUTPUT_0 = 78,
    KSMARTMOTIONALLOWEDCLOSEDLOOPERROR_0 = 79,
    KSMARTMOTIONACCELSTRATEGY_0 = 80,
    KSMARTMOTIONMAXVELOCITY_1 = 81,
    KSMARTMOTIONMAXACCEL_1 = 82,
    KSMARTMOTIONMINVELOUTPUT_1 = 83,
    KSMARTMOTIONALLOWEDCLOSEDLOOPERROR_1 = 84,
    KSMARTMOTIONACCELSTRATEGY_1 = 85,
    KSMARTMOTIONMAXVELOCITY_2 = 86,
    KSMARTMOTIONMAXACCEL_2 = 87,
    KSMARTMOTIONMINVELOUTPUT_2 = 88,
    KSMARTMOTIONALLOWEDCLOSEDLOOPERROR_2 = 89,
    KSMARTMOTIONACCELSTRATEGY_2 = 90,
    KSMARTMOTIONMAXVELOCITY_3 = 91,
    KSMARTMOTIONMAXACCEL_3 = 92,
    KSMARTMOTIONMINVELOUTPUT_3 = 93,
    KSMARTMOTIONALLOWEDCLOSEDLOOPERROR_3 = 94,
    KSMARTMOTIONACCELSTRATEGY_3 = 95,
    KIMAXACCUM_0 = 96,
    KSLOT3PLACEHOLDER1_0 = 97,
    KSLOT3PLACEHOLDER2_0 = 98,
    KSLOT3PLACEHOLDER3_0 = 99,
    KIMAXACCUM_1 = 100,
    KSLOT3PLACEHOLDER1_1 = 101,
    KSLOT3PLACEHOLDER2_1 = 102,
    KSLOT3PLACEHOLDER3_1 = 103,
    KIMAXACCUM_2 = 104,
    KSLOT3PLACEHOLDER1_2 = 105,
    KSLOT3PLACEHOLDER2_2 = 106,
    KSLOT3PLACEHOLDER3_2 = 107,
    KIMAXACCUM_3 = 108,
    KSLOT3PLACEHOLDER1_3 = 109,
    KSLOT3PLACEHOLDER2_3 = 110,
    KSLOT3PLACEHOLDER3_3 = 111,
    KPOSITIONCONVERSIONFACTOR = 112,
    KVELOCITYCONVERSIONFACTOR = 113,
    KCLOSEDLOOPRAMPRATE = 114,
    KSOFTLIMITFWD = 115,
    KSOFTLIMITREV = 116,
    KSOFTLIMITRSVD0 = 117,
    KSOFTLIMITRSVD1 = 118,
    KANALOGPOSITIONCONVERSION = 119,
    KANALOGVELOCITYCONVERSION = 120,
    KANALOGAVERAGEDEPTH = 121,
    KANALOGSENSORMODE = 122,
    KANALOGINVERTED = 123,
    KANALOGSAMPLEDELTA = 124,
    KANALOGRSVD0 = 125,
    KANALOGRSVD1 = 126,
}

export enum configParamTypes {
    KDEFAULT_T = 0,
    KCANID_T = 1,
    KINPUTMODE_T = 1,
    KMOTORTYPE_T = 1,
    KCOMMADVANCE_T = 2,
    KSENSORTYPE_T = 1,
    KCTRLTYPE_T = 1,
    KIDLEMODE_T = 1,
    KINPUTDEADBAND_T = 2,
    KFEEDBACKSENSORPID0_T = 1,
    KFEEDBACKSENSORPID1_T = 1,
    KPOLEPAIRS_T = 1,
    KCURRENTCHOP_T = 2,
    KCURRENTCHOPCYCLES_T = 1,
    KP_0_T = 2,
    KI_0_T = 2,
    KD_0_T = 2,
    KF_0_T = 2,
    KIZONE_0_T = 2,
    KDFILTER_0_T = 2,
    KOUTPUTMIN_0_T = 2,
    KOUTPUTMAX_0_T = 2,
    KP_1_T = 2,
    KI_1_T = 2,
    KD_1_T = 2,
    KF_1_T = 2,
    KIZONE_1_T = 2,
    KDFILTER_1_T = 2,
    KOUTPUTMIN_1_T = 2,
    KOUTPUTMAX_1_T = 2,
    KP_2_T = 2,
    KI_2_T = 2,
    KD_2_T = 2,
    KF_2_T = 2,
    KIZONE_2_T = 2,
    KDFILTER_2_T = 2,
    KOUTPUTMIN_2_T = 2,
    KOUTPUTMAX_2_T = 2,
    KP_3_T = 2,
    KI_3_T = 2,
    KD_3_T = 2,
    KF_3_T = 2,
    KIZONE_3_T = 2,
    KDFILTER_3_T = 2,
    KOUTPUTMIN_3_T = 2,
    KOUTPUTMAX_3_T = 2,
    KINVERTED_T = 3,
    KOUTPUTRATIO_T = 2,
    KSERIALNUMBERLOW_T = 1,
    KSERIALNUMBERMID_T = 1,
    KSERIALNUMBERHIGH_T = 1,
    KLIMITSWITCHFWDPOLARITY_T = 3,
    KLIMITSWITCHREVPOLARITY_T = 3,
    KHARDLIMITFWDEN_T = 3,
    KHARDLIMITREVEN_T = 3,
    KSOFTLIMITFWDEN_T = 3,
    KSOFTLIMITREVEN_T = 3,
    KRAMPRATE_T = 2,
    KFOLLOWERID_T = 1,
    KFOLLOWERCONFIG_T = 1,
    KSMARTCURRENTSTALLLIMIT_T = 1,
    KSMARTCURRENTFREELIMIT_T = 1,
    KSMARTCURRENTCONFIG_T = 1,
    KSMARTCURRENTRESERVED_T = 1,
    KMOTORKV_T = 1,
    KMOTORR_T = 1,
    KMOTORL_T = 1,
    KMOTORRSVD1_T = 1,
    KMOTORRSVD2_T = 1,
    KMOTORRSVD3_T = 1,
    KENCODERCOUNTSPERREV_T = 1,
    KENCODERAVERAGEDEPTH_T = 1,
    KENCODERSAMPLEDELTA_T = 1,
    KENCODERINVERTED_T = 3,
    KENCODERRSVD1_T = 1,
    KCLOSEDLOOPVOLTAGEMODE_T = 1,
    KCOMPENSATEDNOMINALVOLTAGE_T = 2,
    KSMARTMOTIONMAXVELOCITY_0_T = 2,
    KSMARTMOTIONMAXACCEL_0_T = 2,
    KSMARTMOTIONMINVELOUTPUT_0_T = 2,
    KSMARTMOTIONALLOWEDCLOSEDLOOPERROR_0_T = 2,
    KSMARTMOTIONACCELSTRATEGY_0_T = 2,
    KSMARTMOTIONMAXVELOCITY_1_T = 2,
    KSMARTMOTIONMAXACCEL_1_T = 2,
    KSMARTMOTIONMINVELOUTPUT_1_T = 2,
    KSMARTMOTIONALLOWEDCLOSEDLOOPERROR_1_T = 2,
    KSMARTMOTIONACCELSTRATEGY_1_T = 2,
    KSMARTMOTIONMAXVELOCITY_2_T = 2,
    KSMARTMOTIONMAXACCEL_2_T = 2,
    KSMARTMOTIONMINVELOUTPUT_2_T = 2,
    KSMARTMOTIONALLOWEDCLOSEDLOOPERROR_2_T = 2,
    KSMARTMOTIONACCELSTRATEGY_2_T = 2,
    KSMARTMOTIONMAXVELOCITY_3_T = 2,
    KSMARTMOTIONMAXACCEL_3_T = 2,
    KSMARTMOTIONMINVELOUTPUT_3_T = 2,
    KSMARTMOTIONALLOWEDCLOSEDLOOPERROR_3_T = 2,
    KSMARTMOTIONACCELSTRATEGY_3_T = 2,
    KIMAXACCUM_0_T = 2,
    KSLOT3PLACEHOLDER1_0_T = 2,
    KSLOT3PLACEHOLDER2_0_T = 2,
    KSLOT3PLACEHOLDER3_0_T = 2,
    KIMAXACCUM_1_T = 2,
    KSLOT3PLACEHOLDER1_1_T = 2,
    KSLOT3PLACEHOLDER2_1_T = 2,
    KSLOT3PLACEHOLDER3_1_T = 2,
    KIMAXACCUM_2_T = 2,
    KSLOT3PLACEHOLDER1_2_T = 2,
    KSLOT3PLACEHOLDER2_2_T = 2,
    KSLOT3PLACEHOLDER3_2_T = 2,
    KIMAXACCUM_3_T = 2,
    KSLOT3PLACEHOLDER1_3_T = 2,
    KSLOT3PLACEHOLDER2_3_T = 2,
    KSLOT3PLACEHOLDER3_3_T = 2,
    KPOSITIONCONVERSIONFACTOR_T = 2,
    KVELOCITYCONVERSIONFACTOR_T = 2,
    KCLOSEDLOOPRAMPRATE_T = 2,
    KSOFTLIMITFWD_T = 2,
    KSOFTLIMITREV_T = 2,
    KSOFTLIMITRSVD0_T = 2,
    KSOFTLIMITRSVD1_T = 2,
    KANALOGPOSITIONCONVERSION_T = 2,
    KANALOGVELOCITYCONVERSION_T = 2,
    KANALOGAVERAGEDEPTH_T = 1,
    KANALOGSENSORMODE_T = 1,
    KANALOGINVERTED_T = 3,
    KANALOGSAMPLEDELTA_T = 1,
    KANALOGRSVD0_T = 1,
    KANALOGRSVD1_T = 1,
}

export enum configParamGroupName {
    GROUPNAME_BASIC = 0,
    GROUPNAME_MOTOR_ADVANCED = 1,
    GROUPNAME_CLOSED_LOOP = 2,
    GROUPNAME_HIDDEN = 3,
    GROUPNAME_BRUSHLESS_CONFIG = 4,
    GROUPNAME_CURRENT_LIMITS = 5,
    GROUPNAME_PIDF_SLOT_0 = 6,
    GROUPNAME_PIDF_SLOT_1 = 7,
    GROUPNAME_PIDF_SLOT_2 = 8,
    GROUPNAME_PIDF_SLOT_3 = 9,
    GROUPNAME_LIMITS = 10,
    GROUPNAME_FOLLOWER = 11,
    GROUPNAME_ENCODER_PORT_SENSOR = 12,
    GROUPNAME_SMART_MOTION = 13,
    GROUPNAME_ANALOG_SENSOR = 14,
}

export enum configParamGroup {
    GROUP_DEFAULT = 0,
    GROUP_KCANID = 0,
    GROUP_KINPUTMODE = 0,
    GROUP_KMOTORTYPE = 0,
    GROUP_KCOMMADVANCE = 1,
    GROUP_KSENSORTYPE = 0,
    GROUP_KCTRLTYPE = 2,
    GROUP_KIDLEMODE = 0,
    GROUP_KINPUTDEADBAND = 0,
    GROUP_KFEEDBACKSENSORPID0 = 2,
    GROUP_KFEEDBACKSENSORPID1 = 3,
    GROUP_KPOLEPAIRS = 4,
    GROUP_KCURRENTCHOP = 5,
    GROUP_KCURRENTCHOPCYCLES = 5,
    GROUP_KP_0 = 6,
    GROUP_KI_0 = 6,
    GROUP_KD_0 = 6,
    GROUP_KF_0 = 6,
    GROUP_KIZONE_0 = 6,
    GROUP_KDFILTER_0 = 6,
    GROUP_KOUTPUTMIN_0 = 6,
    GROUP_KOUTPUTMAX_0 = 6,
    GROUP_KP_1 = 7,
    GROUP_KI_1 = 7,
    GROUP_KD_1 = 7,
    GROUP_KF_1 = 7,
    GROUP_KIZONE_1 = 7,
    GROUP_KDFILTER_1 = 7,
    GROUP_KOUTPUTMIN_1 = 7,
    GROUP_KOUTPUTMAX_1 = 7,
    GROUP_KP_2 = 8,
    GROUP_KI_2 = 8,
    GROUP_KD_2 = 8,
    GROUP_KF_2 = 8,
    GROUP_KIZONE_2 = 8,
    GROUP_KDFILTER_2 = 8,
    GROUP_KOUTPUTMIN_2 = 8,
    GROUP_KOUTPUTMAX_2 = 8,
    GROUP_KP_3 = 9,
    GROUP_KI_3 = 9,
    GROUP_KD_3 = 9,
    GROUP_KF_3 = 9,
    GROUP_KIZONE_3 = 9,
    GROUP_KDFILTER_3 = 9,
    GROUP_KOUTPUTMIN_3 = 9,
    GROUP_KOUTPUTMAX_3 = 9,
    GROUP_KINVERTED = 0,
    GROUP_KOUTPUTRATIO = 0,
    GROUP_KSERIALNUMBERLOW = 3,
    GROUP_KSERIALNUMBERMID = 3,
    GROUP_KSERIALNUMBERHIGH = 3,
    GROUP_KLIMITSWITCHFWDPOLARITY = 10,
    GROUP_KLIMITSWITCHREVPOLARITY = 10,
    GROUP_KHARDLIMITFWDEN = 10,
    GROUP_KHARDLIMITREVEN = 10,
    GROUP_KSOFTLIMITFWDEN = 10,
    GROUP_KSOFTLIMITREVEN = 10,
    GROUP_KRAMPRATE = 0,
    GROUP_KFOLLOWERID = 11,
    GROUP_KFOLLOWERCONFIG = 11,
    GROUP_KSMARTCURRENTSTALLLIMIT = 5,
    GROUP_KSMARTCURRENTFREELIMIT = 5,
    GROUP_KSMARTCURRENTCONFIG = 5,
    GROUP_KSMARTCURRENTRESERVED = 3,
    GROUP_KMOTORKV = 1,
    GROUP_KMOTORR = 1,
    GROUP_KMOTORL = 1,
    GROUP_KMOTORRSVD1 = 3,
    GROUP_KMOTORRSVD2 = 3,
    GROUP_KMOTORRSVD3 = 3,
    GROUP_KENCODERCOUNTSPERREV = 12,
    GROUP_KENCODERAVERAGEDEPTH = 12,
    GROUP_KENCODERSAMPLEDELTA = 12,
    GROUP_KENCODERINVERTED = 12,
    GROUP_KENCODERRSVD1 = 3,
    GROUP_KCLOSEDLOOPVOLTAGEMODE = 2,
    GROUP_KCOMPENSATEDNOMINALVOLTAGE = 2,
    GROUP_KSMARTMOTIONMAXVELOCITY_0 = 13,
    GROUP_KSMARTMOTIONMAXACCEL_0 = 13,
    GROUP_KSMARTMOTIONMINVELOUTPUT_0 = 13,
    GROUP_KSMARTMOTIONALLOWEDCLOSEDLOOPERROR_0 = 13,
    GROUP_KSMARTMOTIONACCELSTRATEGY_0 = 13,
    GROUP_KSMARTMOTIONMAXVELOCITY_1 = 13,
    GROUP_KSMARTMOTIONMAXACCEL_1 = 13,
    GROUP_KSMARTMOTIONMINVELOUTPUT_1 = 13,
    GROUP_KSMARTMOTIONALLOWEDCLOSEDLOOPERROR_1 = 13,
    GROUP_KSMARTMOTIONACCELSTRATEGY_1 = 13,
    GROUP_KSMARTMOTIONMAXVELOCITY_2 = 13,
    GROUP_KSMARTMOTIONMAXACCEL_2 = 13,
    GROUP_KSMARTMOTIONMINVELOUTPUT_2 = 13,
    GROUP_KSMARTMOTIONALLOWEDCLOSEDLOOPERROR_2 = 13,
    GROUP_KSMARTMOTIONACCELSTRATEGY_2 = 13,
    GROUP_KSMARTMOTIONMAXVELOCITY_3 = 13,
    GROUP_KSMARTMOTIONMAXACCEL_3 = 13,
    GROUP_KSMARTMOTIONMINVELOUTPUT_3 = 13,
    GROUP_KSMARTMOTIONALLOWEDCLOSEDLOOPERROR_3 = 13,
    GROUP_KSMARTMOTIONACCELSTRATEGY_3 = 13,
    GROUP_KIMAXACCUM_0 = 13,
    GROUP_KSLOT3PLACEHOLDER1_0 = 13,
    GROUP_KSLOT3PLACEHOLDER2_0 = 13,
    GROUP_KSLOT3PLACEHOLDER3_0 = 13,
    GROUP_KIMAXACCUM_1 = 13,
    GROUP_KSLOT3PLACEHOLDER1_1 = 13,
    GROUP_KSLOT3PLACEHOLDER2_1 = 13,
    GROUP_KSLOT3PLACEHOLDER3_1 = 13,
    GROUP_KIMAXACCUM_2 = 13,
    GROUP_KSLOT3PLACEHOLDER1_2 = 13,
    GROUP_KSLOT3PLACEHOLDER2_2 = 13,
    GROUP_KSLOT3PLACEHOLDER3_2 = 13,
    GROUP_KIMAXACCUM_3 = 13,
    GROUP_KSLOT3PLACEHOLDER1_3 = 13,
    GROUP_KSLOT3PLACEHOLDER2_3 = 13,
    GROUP_KSLOT3PLACEHOLDER3_3 = 13,
    GROUP_KPOSITIONCONVERSIONFACTOR = 12,
    GROUP_KVELOCITYCONVERSIONFACTOR = 12,
    GROUP_KCLOSEDLOOPRAMPRATE = 12,
    GROUP_KSOFTLIMITFWD = 10,
    GROUP_KSOFTLIMITREV = 10,
    GROUP_KSOFTLIMITRSVD0 = 3,
    GROUP_KSOFTLIMITRSVD1 = 3,
    GROUP_KANALOGPOSITIONCONVERSION = 14,
    GROUP_KANALOGVELOCITYCONVERSION = 14,
    GROUP_KANALOGAVERAGEDEPTH = 14,
    GROUP_KANALOGSENSORMODE = 14,
    GROUP_KANALOGINVERTED = 14,
    GROUP_KANALOGSAMPLEDELTA = 14,
    GROUP_KANALOGRSVD0 = 3,
    GROUP_KANALOGRSVD1 = 3,
}

export enum DRVStat0_Bits {
    VDS_LC_BIT = 0,
    VDS_HC_BIT = 1,
    VDS_LB_BIT = 2,
    VDS_HB_BIT = 3,
    VDS_LA_BIT = 4,
    VDS_HA_BIT = 5,
    OTSD_BIT = 6,
    UVLO_BIT = 7,
    GDF_BIT = 8,
    VDS_OCP_BIT = 9,
    FAULT_BIT = 10,
}

export enum DRVStat1_Bits {
    VGS_LC_BIT = 0,
    VGS_HC_BIT = 1,
    VGS_LB_BIT = 2,
    VGS_HB_BIT = 3,
    VGS_LA_BIT = 4,
    VGS_HA_BIT = 5,
    CPUV_BIT = 6,
    OTW_BIT = 7,
    SC_OC_BIT = 8,
    SB_OC_BIT = 9,
    SA_OC_BIT = 10,
}
