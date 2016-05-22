import React from 'react';
import { Entity, AtomicBlockUtils } from 'draft-js';
import StyleButton from '../StyleButton';
import UrlInputField from './UrlInputField';
import { atomicBlockTypes } from '../../atomicBlocks/atomicBlockTypes';

class MediaHeaderControls extends React.Component {

    constructor(props) {
        super(props);

        this.addMedia = this._addMedia.bind(this);
        this.cancelLink = this._cancelLink.bind(this);
        this.confirmLink = this._confirmLink.bind(this);
        this.collapseLinkBlock = this._collapseLinkBlock.bind(this);

        this.openAudioInput = this._openAudioInput.bind(this);
        this.openImageInput = this._openImageInput.bind(this);
        this.openVideoInput = this._openVideoInput.bind(this);
        this.addMoreInfoTag = () => this._addMoreInfoTag();

        this.openUrlInputField = (type) => this._openUrlInputField(type);

        this.state = {
            urlInputField: {
                isActive: false,
                type: undefined
            }
        }
    }

    _openAudioInput() {
        this.openUrlInputField(atomicBlockTypes.AUDIO)
    }

    _openImageInput() {
        this.openUrlInputField(atomicBlockTypes.IMAGE)
    }

    _openVideoInput() {
        this.openUrlInputField(atomicBlockTypes.VIDEO)
    }

    _addMoreInfoTag() {
        //TODO fix automatic extra line creation: https://github.com/facebook/draft-js/issues/327
        //TODO if more-info already exist: remove it before adding new one!
        this.props.onChange(
            AtomicBlockUtils.insertAtomicBlock(
                this.props.editorState,
                Entity.create(atomicBlockTypes.MORE_INFO, 'IMMUTABLE', {text: 'Read more'}),
                ' '
            )
        )
    }

    _openUrlInputField(type) {
        this.setState({
            urlInputField: {
                isActive: true,
                type: type
            }
        });
    }

    _confirmLink(urlValue) {
        if (urlValue && urlValue !== '') {
            // TODO add check if valid media link!
            this.addMedia(this.state.urlInputField.type, urlValue)
        }
        this.collapseLinkBlock();
    }

    _addMedia(type, src) {
        const entityKey = Entity.create(type, 'IMMUTABLE', {src});

        this.props.onChange(
            AtomicBlockUtils.insertAtomicBlock(
                this.props.editorState,
                entityKey,
                ' '
            )
        )
    }

    _collapseLinkBlock() {
        this.setState({
            urlInputField: {
                isActive: false,
                type: undefined
            }
        }, () => {
            setTimeout(() => this.props.onFocus(), 0);
        })
    }

    _cancelLink() {
        this.collapseLinkBlock();
    }

    render() {
        let urlInput;
        const {type, isActive} = this.state.urlInputField;

        if (isActive) {
            urlInput =
                <UrlInputField
                    onConfirm={this.confirmLink}
                    onCancel={this.cancelLink}
                />;
        }

        return (
            <div>
                <StyleButton
                    key={atomicBlockTypes.AUDIO}
                    active={type === atomicBlockTypes.AUDIO}
                    label='Add Audio'
                    onToggle={this.openAudioInput}
                    style={true}
                />
                <StyleButton
                    key={atomicBlockTypes.IMAGE}
                    active={type === atomicBlockTypes.IMAGE}
                    label='Add Image'
                    onToggle={this.openImageInput}
                    style={true}
                />
                <StyleButton
                    key={atomicBlockTypes.VIDEO}
                    active={type === atomicBlockTypes.VIDEO}
                    label='Add Video'
                    onToggle={this.openVideoInput}
                    style={true}
                />
                <StyleButton
                    key={atomicBlockTypes.MORE_INFO}
                    active={false}
                    label='Add More info label'
                    onToggle={this.addMoreInfoTag}
                    style={true}
                />
                    {urlInput}
            </div>
        )
    }
}

MediaHeaderControls.propTypes = {
    editorState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func.isRequired
};

export default MediaHeaderControls;
