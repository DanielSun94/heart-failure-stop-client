class RouterButton extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        window.location.href= TRAJECTORY_ANALYSIS_ROOT+"?"+USER_AFFILIATED_HOSPITAL_CODE+"=1";
    }

    render(){
        return(
            <div>
                <button onClick={this.handleClick}>click me!</button>
            </div>
        );
    }
}

ReactDOM.render(
    <RouterButton />,
    document.getElementById('content')
);