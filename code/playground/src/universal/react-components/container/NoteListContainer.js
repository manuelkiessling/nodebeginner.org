import React, { Component } from "react";
import { connect } from "react-redux";
import NoteList from "../presentational/NoteList"
import { NoteEntity } from "../../entities/NoteEntity";

const mapStateToProps = (state) => {
    return {
        notes: state.entities[NoteEntity.entityName()].calculatedEntities
    };
};

class NoteListContainer extends Component {
    render() {
        return <NoteList notes={this.props.notes} />;
    }
}

export default connect(mapStateToProps, null)(NoteListContainer);
