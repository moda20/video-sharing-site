import React from "react";
import PropTypes from "prop-types";

import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import TrendingVideo from "./TrendingVideo.jsx";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {results: []};
    }

    componentDidMount() {
        $.post("http://localhost:8000/api/search", {
            query: this.props.match.params.q
        }, (data) => {
            this.setState({results: data});
        });
    }

    render() {
        let {time, results} = this.state.results;
        let timeDiv = <div>Fetched {results ? results.length : 0} results in {time} ms.</div>;
        // Results div
        let div = this.state.results.results ? this.state.results.results.map((result, i) => {
            return <TrendingVideo key={i}
                thumbnail={"https://i.ytimg.com/vi/3tmd-ClpJxA/hqdefault.jpg?sqp=-oaymwEXCPYBEIoBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCh-ggcGnKyoQ-4f-pjnjfzDHqlSw"}
                title={result._source.title}
                user={result._source.username}
                views={"0"} // TODO: Figure out a way to get this
                age={0}
                desc={result._source.description} />;
        }) : <div></div>;

        return (
            <div>
                <Navbar dp={this.props.user ? this.props.user.dp : "http://localhost:8000/account_circle.png"} />
                <Sidebar toggleLogin={this.props.toggleLogin} loggedIn={this.props.user ? true : false} />
                <div style={{position: "absolute", width: "calc(100vw - 350px)", marginLeft: "350px", top: "100px"}}>
                    <div className="center">
                        {timeDiv}
                    </div>
                    <div className="center">
                        {div}
                    </div>
                </div>
            </div>
        );
    }
}

SearchResults.propTypes = {
    user: PropTypes.object,
    toggleLogin: PropTypes.func.isRequired,
    match: PropTypes.object
};

export default SearchResults;
