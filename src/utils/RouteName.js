class RouteName{
    // Top Level Page
    static ERROR_PAGE = "/error";
    static INDEX = "/";

    // Main page
    static MAIN_PAGE = "/heart-failure-stop";

    // user info Route
    static USER_INFO = "data/userInfo"

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

    // Trajectory Analysis Data Route
    // b means backend
    static B_TRAJECTORY_ANALYSIS_DATA_ROOT = "/backend/data/trajectoryAnalysis";
    static B_TRAJECTORY_ANALYSIS_ROOT = "/trajectoryAnalysis";
    static B_TRAJECTORY_ANALYSIS_UNIFIED_PATIENT_ID = "/unifiedPatientID";
    static B_TRAJECTORY_ANALYSIS_BASIC_INFO ="/basicInfo";
    static B_TRAJECTORY_ANALYSIS_TRAJECTORY ="/trajectory";
    static B_TRAJECTORY_ANALYSIS_VISIT_DETAILED_INFO ="/visitDetailedInfo";
    static B_TRAJECTORY_ANALYSIS_VISIT_BRIEF_INFO ="/visitBriefInfo";
    static B_TRAJECTORY_ANALYSIS_LAB_TEST ="/labTest";
    static B_TRAJECTORY_ANALYSIS_MEDICAL_ORAL_INTERVENTION ="/medicalOralIntervention";
    static B_TRAJECTORY_ANALYSIS_VITAL_SIGN ="/vitalSign";
    static B_TRAJECTORY_ANALYSIS_EXAM ="/exam";

    // Authentic Route
    static B_AUTHENTIC = "/backend/authentic";
    static B_AUTH_SIGNUP = '/signup';
    static B_AUTH_LOGIN = '/login';
}

export default RouteName;