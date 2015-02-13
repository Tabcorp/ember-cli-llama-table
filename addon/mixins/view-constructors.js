import Em from 'ember';
import LlamaHeader from 'llama-table/views/llama-header';
import LlamaHeaderColumngroup from 'llama-table/views/llama-header-columngroup';
import LlamaHeaderColumn from 'llama-table/views/llama-header-column';
import LlamaHeaderCell from 'llama-table/views/llama-header-cell';
import LlamaBody from 'llama-table/views/llama-body';
import LlamaBodyColumngroup from 'llama-table/views/llama-body-columngroup';
import LlamaBodyColumn from 'llama-table/views/llama-body-column';
import LlamaBodyCell from 'llama-table/views/llama-body-cell';
import LlamaNumberCell from 'llama-table/views/llama-number-cell';
import { defaultValue } from 'llama-table/computed';

var ViewConstructorsMixin = Em.Mixin.create({
	HeaderView: defaultValue('config.HeaderView', LlamaHeader),
	HeaderColumngroupView: defaultValue('config.HeaderColumngroupView', LlamaHeaderColumngroup),
	HeaderColumnView: defaultValue('config.HeaderColumnView', LlamaHeaderColumn),
	HeaderCellView: defaultValue('config.HeaderCellView', LlamaHeaderCell),
	BodyView: defaultValue('config.BodyView', LlamaBody),
	BodyColumngroupView: defaultValue('config.BodyColumngroupView', LlamaBodyColumngroup),
	BodyColumnView: defaultValue('config.BodyColumnView', LlamaBodyColumn),
	BodyCellView: defaultValue('config.BodyCellView', LlamaBodyCell),
	NumberCellView: defaultValue('config.NumberCellView', LlamaNumberCell)
});

export default ViewConstructorsMixin;
