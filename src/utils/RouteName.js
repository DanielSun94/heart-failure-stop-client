class RouteName{
    // Top Level Page
    static ERROR_PAGE = "/error";
    static INDEX = "/";

    // Main page
    static MAIN_PAGE = "/heart-failure-stop";

    // user info Route
    static USER_INFO = "data/userInfo"

    // Trajectory Analysis Data Route
    static TRAJECTORY_ANALYSIS_DATA_ROOT = "/data/trajectoryAnalysis";
    static TRAJECTORY_ANALYSIS_ROOT = "/trajectoryAnalysis";
    static TRAJECTORY_ANALYSIS_UNIFIED_PATIENT_ID = "/unifiedPatientID";
    static TRAJECTORY_ANALYSIS_BASIC_INFO ="/basicInfo";
    static TRAJECTORY_ANALYSIS_TRAJECTORY ="/trajectory";
    static TRAJECTORY_ANALYSIS_VISIT_DETAILED_INFO ="/visitDetailedInfo";
    static TRAJECTORY_ANALYSIS_VISIT_BRIEF_INFO ="/visitBriefInfo";
    static TRAJECTORY_ANALYSIS_LAB_TEST ="/labTest";
    static TRAJECTORY_ANALYSIS_MEDICAL_ORAL_INTERVENTION ="/medicalOralIntervention";
    static TRAJECTORY_ANALYSIS_VITAL_SIGN ="/vitalSign";
    static TRAJECTORY_ANALYSIS_EXAM ="/exam";

    // Dashboard content route
    static DASHBOARD_TRAJECTORY_ANALYSIS = '/trajectory-analysis';
    static DASHBOARD_BLANK_PAGE = '/blank-page';

    // Authentic Route
    static AUTHENTIC_PAGE = "/authentic";
    static AUTH_REGISTER = '/register';
    static AUTH_LOGIN = '/login';

    //HTTP Verb
    static GET = "GET";
    static POST = "POST";
}

export default RouteName;