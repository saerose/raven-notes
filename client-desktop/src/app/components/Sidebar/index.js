import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SidebarContainer, H3, SName, USection, GSection, Sect } from './styles';

import { Query } from 'react-apollo';
import { GET_NOTES_FROM_SERVER, GET_GROUP_NOTES, GET_CURRENT_GROUP_NOTES } from '../../graphql/queries';


class Sidebar extends Component {
  render() {
    return (
      <SidebarContainer>
        <H3><span role='img' aria-label='monkey'>🐒</span> User Name</H3>
        <USection>
          <SName>PRIVATE</SName>

          <Query query={GET_NOTES_FROM_SERVER}>
            {({loading, error, data, client}) => {
              return(
                <Sect onClick={() => client.writeQuery({ query: GET_GROUP_NOTES, data})}>
                  <span role='img' aria-label='monkey'>🌼</span>
                  All Notes
                </Sect>
              )
            }}
          </Query>

          <Sect><span role='img' aria-label='monkey'>🌼</span> Extracts</Sect>
        </USection>
        <GSection>
        <SName>WORKSPACE</SName>

        {/* Testing time */}
        <Query query={GET_GROUP_NOTES}>
        {({loading, error, data, client}) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>There's an error.</p>
          const groups = data.groups
          console.log('data from query', data)
          return (
            groups.map((group, i) => {
            return (
              <Sect
                key={i}
                group={group}
                onClick={() => console.log(group) || this.props.display(group.notes)}
                // onClick={() => {client.writeQuery({ query: GET_CURRENT_GROUP_NOTES, data: { groups: groups[i] }})}}
              >
                <span role='img' aria-label='monkey'>🌞</span>{groups[i].name}
              </Sect>
            )
          })
          // Map sections and return notes from indexOf section
          )
        }}
        </Query>
        {/* No more testing */}
        <Sect><span role='img' aria-label='monkey'>🌞</span>Sassy Designers</Sect>
        <Sect><span role='img' aria-label='monkey'>🌞</span>ReactJS</Sect>
        </GSection>
      </SidebarContainer>
    );
  }
}

export default Sidebar;
