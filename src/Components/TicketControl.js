import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as a from './../actions';
import { formatDistanceToNow } from 'date-fns';
import { ThemeContext } from "../context/theme-context";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // formVisibleOnPage: false,
      selectedTicket: null,
      editing: false,
    };
  }

  componentDidMount() {
    this.WaitTimeUpdateTimer = setInterval(() =>
    this.updateTicketElapsedWaitTime(),
    6000
    );
  }

  componentDidUpdate() {
    console.log("component updated!");
  }

  componentWillUnmount(){
    console.log("component unmounted!");
  }

  updateTicketElapsedWaitTime2 = () => {
    console.log("tick");
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
      // this.setState((prevState) => ({
      //   formVisibleOnPage: !prevState.formVisibleOnPage,
      // }));
    }
  };

  handleEditClick = () => {
    console.log('handleEditClick reached!');
    if (this.state.selectedTicket != null){
      this.setState({ 
        selectedTicket: null,
        editing: false 
      });
    } else {
      const { dispatch } = this.props;
      const action = {
        type: 'TOGGLE_FORM'
      }
      dispatch(action);
    }
    
  };

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    // const { id, names, location, issue } = newTicket;
    // const action = {
    //   type: 'ADD_TICKET',
    //   id: id,
    //   names: names,
    //   location: location,
    //   issue: issue,
    // }
    const action = a.addTicket(newTicket);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2)
    // const action2 = {
    //   type: 'TOGGLE_FORM'
    // }
    // dispatch(action2);
    // this.setState({formVisibleOnPage: false});
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
    // const action = {
    //   type: 'DELETE_TICKET',
    //   id: id
    // }
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.mainTicketList).forEach(ticket => {
        const newFormattedWaitTime = formatDistanceToNow(ticket.timeOpen, {
          addSuffix: true
        });
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  }

  render() {
    let theme = this.context;

    const buttonStyles = { 
      backgroundColor: theme.buttonBackground, 
      color: theme.textColor, 
    }

    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = (
        <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      );
      buttonText = 'Return to Ticket List';
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = (
        <TicketDetail
          ticket={this.state.selectedTicket}
          onClickingDelete={this.handleDeletingTicket}
          onClickingEdit={this.handleEditClick}
        />
      );
      buttonText = 'Return to Ticket List';
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      );
      buttonText = 'Return to Ticket List';
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      buttonText = 'Add Ticket';
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button style={buttonStyles} onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

TicketControl.contextType = ThemeContext;

export default TicketControl;
