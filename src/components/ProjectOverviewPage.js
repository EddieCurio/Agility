import React from 'react';

import {
    connect
} from 'react-redux';

import {
    bindActionCreators
} from 'redux';

import {
    withRouter
} from 'react-router';

import Sidebar from 'react-sidebar';

import * as projActions from '../actions/projActions';

import NavBar from './common/Navbar';

import {OverviewSubnav} from './common/OverviewSubnav';
import {ProjectOverview} from './project/ProjectOverview';
import MemberSidebarItem from './common/MemberSidebarItem';

import styles from '../styles/ProjectOverviewPage.module.css';

import { Parse } from 'parse';

const mql = window.matchMedia(`(min-width: 900px)`);

/* TODO: delete mock proj member data */
const members = [
    {fname: 'Joe', lname: 'Schmo'},
    {fname: 'Joe', lname: 'Schmo'},
    {fname: 'Joe', lname: 'Schasdfasdfamo'},
    {fname: 'Joe', lname: 'Schmo'},
    {fname: 'Joe', lname: 'Schasdfasdfamo'},
    {fname: 'Joe', lname: 'Schmo'},
    {fname: 'Joe', lname: 'Schasdfasdfamo'},
    {fname: 'Joe', lname: 'Schmo'},
    {fname: 'Joe', lname: 'Schasdfasdfamo'},
    {fname: 'Joe', lname: 'Schmo'},
    {fname: 'Joe', lname: 'Schasdfasdfamo'},
    {fname: 'Joe', lname: 'Schmo'},
    {fname: 'Joe', lname: 'Schasdfasdfamo'},
    {fname: 'Joe', lname: 'Schmo'} 
];

class ProjectOverviewPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 0,
            sidebarOpen: false,
            mql: mql,
            docked: props.docked,
            open: props.open,
            members: members
        };
        this.setActive = this.setActive.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.generateSidebar = this.generateSidebar.bind(this);

        var currentUser = Parse.User.current();
        if (!currentUser) {
            this.props.history.push("/login");
        }
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql, sidebarDocked: mql.matches});
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    mediaQueryChanged() {
        this.setState({sidebarDocked: this.state.mql.matches});
    }    

    toggleSidebar(open) {        
        this.setState({sidebarOpen: open});
    }

    setActive(e) {
        this.setState({active: e.target.dataset.tab});
    }

    generateSidebar() {
        // TODO: generate list of project members for DM-ing

        return (
            <ul className={styles.sidebarUL}>
                {this.state.members.map( (person, index) => <MemberSidebarItem 
                    fname={person.fname} lname={person.lname} key={index}/>)}
            </ul>
        );
    }
    
    //
    render() {
        let sidebarContent = this.generateSidebar();

        return (
            <div style={{height: '100%'}}>
                <NavBar projName="Project" />
                <Sidebar sidebar={sidebarContent}
                    open={this.state.sidebarOpen}
                    docked={this.state.sidebarDocked}
                    onSetOpen={this.toggleSidebar}
                    styles={{root: {top: '56px', overflowY: 'auto'}, content: {overflowY: 'auto'}, overlay: {top: '56px'}, sidebar: {backgroundColor: 'white', width: 250}}}>
                    <OverviewSubnav active={this.state.active} toggleSidebar={this.toggleSidebar} docked={this.state.sidebarDocked}/>
                    <ProjectOverview onSidebarToggle={this.toggleSidebar}/>
                </Sidebar>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(projActions, dispatch)
    };
}

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        ajaxCalls: state.ajaxCallsInProgress
    }
}

const connectedPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectOverviewPage));
export {
    connectedPage as ProjectOverviewPage
};