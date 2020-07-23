<template>
    <button
        :title="toolTip"
        :disabled="disabled"
        :class="renderClassName"
        @click="onClick()"
    >
        <slot></slot>
    </button>
</template>

<script lang='ts' >
	import { Vue, Component, Prop } from 'vue-property-decorator';

    export interface IButtonProps {
        onClick: any,
        toolTip: string,
        disabled?: boolean,
        className?: string,
    }

    @Component
    export default class Button
        extends Vue
        implements IButtonProps
    {
        name = 'Button';
        @Prop({ required: true })
        toolTip!: string;
        @Prop({ required: true })
        onClick!: any;
        @Prop()
        className: string | undefined;
        @Prop()
        disabled: boolean | undefined;
        get renderClassName() {
            let n = [];
            if (this.className) {
                n.push(this.className);
            }
            if (this.disabled) {
                n.push('disabled');
            }
            return n.join(' ');
        }
    };
</script>
