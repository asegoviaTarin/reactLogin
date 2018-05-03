import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, dataActions } from '../_actions';
import  MyTable from '../_components/MyTable';
// import  MyChart from '../_components/Chart';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(dataActions.getData());
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  render() {
    if (!this.props.data.products || !this.props.data.products[0]) {
      return null;
    }
    const { data } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi!</h1>
        {this.props.data.products && <div>
          <p>You're logged in with React!!</p>
          <MyTable products={data.products}/>
        </div>
        }
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>

    );
  }
}

function mapStateToProps(state) {
  const { users, authentication, data } = state;
  const { user } = authentication;
  return {
    user,
    users,
    data,
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
