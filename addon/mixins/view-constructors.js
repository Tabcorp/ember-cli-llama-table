import Em from 'ember';
import LlamaTable from 'llama-table/views/llama-table';
import LlamaHeader from 'llama-table/views/llama-header';
import LlamaHeaderColumngroup from 'llama-table/views/llama-header-columngroup';
import LlamaHeaderColumn from 'llama-table/views/llama-header-column';
import LlamaHeaderCell from 'llama-table/views/llama-header-cell';
import LlamaContent from 'llama-table/views/llama-content';
import LlamaSubcontent from 'llama-table/views/llama-subcontent';
import LlamaEmpty from 'llama-table/views/llama-empty';
import LlamaLoading from 'llama-table/views/llama-loading';
import LlamaBody from 'llama-table/views/llama-body';
import LlamaBodyColumngroup from 'llama-table/views/llama-body-columngroup';
import LlamaBodyColumn from 'llama-table/views/llama-body-column';
import LlamaBodyCell from 'llama-table/views/llama-body-cell';
import LlamaNumberCell from 'llama-table/views/llama-number-cell';
import LlamaEmbed from 'llama-table/views/llama-embed';
import LlamaFooter from 'llama-table/views/llama-footer';
import LlamaFooterColumngroup from 'llama-table/views/llama-footer-columngroup';
import LlamaFooterColumn from 'llama-table/views/llama-footer-column';
import { defaultValue } from 'llama-table/computed';

/**
 * Defines each view used by the component. All views can be overridden.
 * @module mixins
 * @constructor
 * @class ViewConstructorsMixin
 * @extends Ember.Mixin
 */
var ViewConstructorsMixin = Em.Mixin.create({
	TableView: defaultValue('config.TableView', LlamaTable),
	HeaderView: defaultValue('config.HeaderView', LlamaHeader),
	HeaderColumngroupView: defaultValue('config.HeaderColumngroupView', LlamaHeaderColumngroup),
	HeaderColumnView: defaultValue('config.HeaderColumnView', LlamaHeaderColumn),
	HeaderCellView: defaultValue('config.HeaderCellView', LlamaHeaderCell),
	ContentView: defaultValue('config.ContentView', LlamaContent),
	SubcontentView: defaultValue('config.SubcontentView', LlamaSubcontent),
	EmptyView: defaultValue('config.EmptyView', LlamaEmpty),
	LoadingView: defaultValue('config.LoadingView', LlamaLoading),
	BodyView: defaultValue('config.BodyView', LlamaBody),
	BodyColumngroupView: defaultValue('config.BodyColumngroupView', LlamaBodyColumngroup),
	BodyColumnView: defaultValue('config.BodyColumnView', LlamaBodyColumn),
	BodyCellView: defaultValue('config.BodyCellView', LlamaBodyCell),
	NumberCellView: defaultValue('config.NumberCellView', LlamaNumberCell),
	EmbedView: defaultValue('config.EmbedView', LlamaEmbed),
	FooterView: defaultValue('config.FooterView', LlamaFooter),
	FooterColumngroupView: defaultValue('config.FooterColumngroupView', LlamaFooterColumngroup),
	FooterColumnView: defaultValue('config.FooterColumnView', LlamaFooterColumn)
});

export default ViewConstructorsMixin;
