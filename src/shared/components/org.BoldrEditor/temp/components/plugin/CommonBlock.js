import React, { Component } from "react";

import Dropdown from "../Dropdown";
import {
  BlockActionGroup,
  BlockControls,
  BlockWrapper
} from "../plugin";


export default class CommonBlock extends Component {
  constructor(props) {
    super(props);

    this._handleFeaturedChange = ::this._handleFeaturedChange;
  }

  _handleFeaturedChange(newValue) {
    this.props.container.updateEntity({featured: newValue});
  }

  render(){
    const data = this.props.data;

    return (
      <BlockWrapper>
        <BlockControls>
          <Dropdown
            items={this.props.featuredOptions}
            selected={data.featured || this.props.defaultFeatured}
            onChange={this._handleFeaturedChange} />

          <BlockActionGroup items={this.props.actions} />
        </BlockControls>

        {this.props.children}
      </BlockWrapper>
    );
  }
}
