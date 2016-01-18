import Em from 'ember';
import { defaultValue } from 'llama-table/computed';

/**
 * Defines each view used by the component. All views can be overridden.
 * @module mixins
 * @constructor
 * @class ViewConstructorsMixin
 * @extends Ember.Mixin
 */
var ViewConstructorsMixin = Em.Mixin.create({
	TableView: defaultValue('config.TableView', 'llama-table-main'),
	HeaderView: defaultValue('config.HeaderView', 'llama-header'),
	HeaderColumngroupView: defaultValue('config.HeaderColumngroupView', 'llama-header-columngroup'),
	HeaderColumnView: defaultValue('config.HeaderColumnView', 'llama-header-column'),
	HeaderCellView: defaultValue('config.HeaderCellView', 'llama-header-cell'),
	ContentView: defaultValue('config.ContentView', 'llama-content'),
	SubcontentView: defaultValue('config.SubcontentView', 'llama-subcontent'),
	EmptyView: defaultValue('config.EmptyView', 'llama-empty'),
	LoadingView: defaultValue('config.LoadingView', 'llama-loading'),
	BodyView: defaultValue('config.BodyView', 'llama-body'),
	BodyColumngroupView: defaultValue('config.BodyColumngroupView', 'llama-body-columngroup'),
	BodyColumnView: defaultValue('config.BodyColumnView', 'llama-body-column'),
	BodyCellView: defaultValue('config.BodyCellView', 'llama-body-cell'),
	NumberCellView: defaultValue('config.NumberCellView', 'llama-number-cell'),
	EmbedView: defaultValue('config.EmbedView', 'llama-embed'),
	FooterView: defaultValue('config.FooterView', 'llama-footer'),
	FooterColumngroupView: defaultValue('config.FooterColumngroupView', 'llama-footer-columngroup'),
	FooterColumnView: defaultValue('config.FooterColumnView', 'llama-footer-column'),
});

export default ViewConstructorsMixin;
