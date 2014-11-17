import Ember from 'ember';
import SlGridMixin from 'sl-components/mixins/sl-grid-controller';

export default Ember.ArrayController.extend( SlGridMixin, {

    actions: {
        /**
         * Trigger reload of the model
         *
         * @function actions.reload
         * @returns  {void}
         */
        reload: function() {
            this.reloadModel( true );
        },

        /**
         * testAction - simple test action
         * @return {void}
         */
        testAction: function(){
            alert( 'This is a test from the sl-grid controller!' );
        }
    },

    itemController: 'sl-grid-item',

    gridDefinition: {
        options: {
            rowExpander      : true,
            actionsColumn    : true,
            settingsMenu     : {
                translationKeys: {
                    actions: 'ACTIONS',
                    columns: 'COLUMNS',
                    resetColumnsToDefaults: 'RESETCOLUMNS'
                },
                actions: [
                    {
                        label: 'TESTACTION',
                        action: 'testAction'
                    }
                ],
                hideableColumns: true
            }
        },
        columns: [
            {
                component: 'sl-grid-table-cell-row-expander',
                cssClass: 'sl-grid-table-cell-row-expander',
                cssThClass: 'sl-grid-table-cell-row-expander',
                fixedWidth: 30
            },
            {
                key: 'name',
                title: 'HOSTNAME',
                defaultText: 'translate.UNKNOWNDEVICE',
                sortable: true,
                resizable: true,                
                widthHint: 2
            },
            {
                key: 'ip',
                title: 'IPADDRESS',
                sortable: true,
                hideable: true,
                resizable: true,
                widthHint: 1
            },
            {
                key: 'type',
                title: 'DEVICETYPE',
                sortable: true,
                hideable: true,                
                resizable: true,                
                widthHint: 1
            },
            {
                key: 'notes',
                title: 'NOTES',
                hideable: true,                
                resizable: true,                
                widthHint: 3
            },
            {
                key: 'fmtProvisionDate',
                title: 'PROVISIONDATE',
                hideable: true,
                resizable: true,
                widthHint: 1
            },
            {
                cssClass: 'sl-grid-table-cell-actions',
                cssThClass: 'sl-grid-table-cell-actions',
                component: 'sl-grid-table-cell-actions',
                fixedWidth: 120
            }
        ]
    },

    /**
     * Reload the model for this controller
     *
     * @function reloadModel
     * @return {void}
     */
    reloadModel: function() {
        var model = this.store.find( 'device' );

        this.set( 'model', model );
    },
});
