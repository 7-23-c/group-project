import React from 'react'

const SearchSuggestions = (props) => {
  let options=''
  { props.results == null ?
    <li> No results Found </li> : 
    options = props.results.map(res => (
      <li key={res.id}>
        {res.username}
      </li>
    ));
  }
  return <ul>{options}</ul>
}

export default SearchSuggestions;