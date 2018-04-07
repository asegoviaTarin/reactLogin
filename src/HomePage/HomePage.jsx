import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, dataActions } from '../_actions';
import  MyTable from '../_components/Mytable';
import  MyChart from '../_components/chart';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(dataActions.getData());
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        if(!this.props.data.products || !this.props.data.products[0] ){
            console.log('NO HAY PROPS',this.props)
            return null
        }
        console.log('SI props',this.props)
        
        const { user, users, data } = this.props;
        console.log('LOS PRODUCTOS CUANDO SE PASAN:', data.products )
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p>
                <MyChart data= {data.products}/>
                <MyTable products= {data.products}/>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                
            </div>
           
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication, data} = state;
    const { user } = authentication;
    return {
        user,
        users,
        data
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };