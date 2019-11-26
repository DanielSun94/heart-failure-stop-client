class RouteName{
    // Top Level Page
    static ERROR_PAGE = "/error";
    static INDEX = "/";

    // Main page
    static MAIN_PAGE = "/heart-failure-stop";

    // Dashboard content route
    static DASHBOARD_TRAJECTORY_ANALYSIS = '/trajectory-analysis';
    static DASHBOARD_BLANK_PAGE = '/blank-page';
    static USER_INFO = "/userInfo"
    static OVERVIEW = "/overview"
    static GROUP_ANALYSIS = "/group-analysis"
    static KNOWLEDGE_GRAPH = "/knowledge-graph"
    static ACCOUNT_MANAGEMENT = "/account-management"

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
    static B_TRAJECTORY_ANALYSIS_UNIFIED_PATIENT_ID = "/unifiedPatientID";
    static B_TRAJECTORY_ANALYSIS_BASIC_INFO ="/basicInfo";
    static B_TRAJECTORY_ANALYSIS_TRAJECTORY ="/trajectory";
    static B_TRAJECTORY_ANALYSIS_VISIT_DETAILED_INFO ="/visitDetailedInfo";
    static B_TRAJECTORY_ANALYSIS_VISIT_BRIEF_INFO ="/visitBriefInfo";
    static B_TRAJECTORY_ANALYSIS_LAB_TEST ="/labTest";
    static B_TRAJECTORY_ANALYSIS_ORDER ="/order";
    static B_TRAJECTORY_ANALYSIS_VITAL_SIGN ="/vitalSign";
    static B_TRAJECTORY_ANALYSIS_EXAM ="/exam";

    // run machine learning model
    static B_MACHINE_LEARNING = "/backend/machineLearning";
    static B_TENSORFLOW_HAWKES_RNN = "/tensorflow/hawkesRNN";

    // Authentic Route
    static B_AUTHENTIC = "/backend/authentic";
    static B_AUTH_SIGNUP = '/signup';
    static B_AUTH_SIGNUP_USER_EXIST_TEST = '/signupUserExistTest';
    static B_AUTH_LOGIN = '/login';

    // Get User Info Route
    static B_USER_INFO_DATA_ROOT = "/backend/data/userInfo";
    static B_USER_INFO = "/userInfo"
}

export default RouteName;