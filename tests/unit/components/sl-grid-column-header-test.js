import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent( 'sl-grid-column-header', 'Unit | Component | sl grid column header', {
    unit: true
});

test( 'Default property values', function( assert ) {
    const component = this.subject();

    assert.strictEqual(
        component.get( 'tagName' ),
        'th',
        'Tag name is th'
    );

    assert.strictEqual(
        component.get( 'column' ),
        null,
        'column is null'
    );
});

test( 'sortedClass() returns the correct value', function( assert ) {
    const column = Ember.Object.extend().create({
        sortable: true
    });

    const component = this.subject({
        column: column
    });

    assert.strictEqual(
        component.get( 'sortedClass' ),
        null,
        'sortedClass returns null when sortAscending is not set '
    );

    column.set( 'sortAscending', true );

    assert.strictEqual(
        component.get( 'sortedClass' ),
        'column-ascending',
        'sortedClass returns column-ascending'
    );

    column.set( 'sortAscending', false );

    assert.strictEqual(
        component.get( 'sortedClass' ),
        'column-descending',
        'sortedClass returns column-descending'
    );
});

test( 'sortedIconClass() returns the correct value', function( assert ) {
    const column = Ember.Object.extend().create({
        sortable: true
    });

    const component = this.subject({
        column: column
    });

    assert.strictEqual(
        component.get( 'sortIconClass' ),
        'fa-sort',
        'sortIconClass returns fa-sort when sortAscending is set to true'
    );

    column.set( 'sortAscending', true );

    assert.strictEqual(
        component.get( 'sortIconClass' ),
        'fa-sort-asc',
        'sortIconClass returns column-asc'
    );

    column.set( 'sortAscending', false );

    assert.strictEqual(
        component.get( 'sortIconClass' ),
        'fa-sort-desc',
        'sortIconClass returns column-desc'
    );
});

test( 'Click event returns column with sortable column', function( assert ) {
    assert.expect( 2 );

    const column = {};
    const targetObject = {
        test() {
            assert.ok(
                false,
                'Bound click action was fired without a valid sortable column'
            );
        }
    };

    this.subject({
        column,
        onClick: 'test',
        targetObject
    });


    // This click should not cause the initial assertion to run
    this.$().trigger( 'click' );

    Ember.run( () => {
        Ember.set( column, 'sortable', true );

        targetObject.test = function( passedColumn ) {
            assert.ok(
                true,
                'onClick action handler was called'
            );

            assert.deepEqual(
                passedColumn,
                column,
                'onClick passed expected column definition'
            );
        };
    });

    this.$().trigger( 'click' );
});

test( 'Dependent keys are correct', function( assert ) {
    const component = this.subject();

    const sortedClassDependentKeys = [
        'column.sortAscending',
        'column.sortable'
    ];

    const sortIconClassDependentKeys = [
        'column.sortAscending',
        'column.sortable'
    ];

    assert.deepEqual(
        component.sortedClass._dependentKeys,
        sortedClassDependentKeys
    );

    assert.deepEqual(
        component.sortIconClass._dependentKeys,
        sortIconClassDependentKeys
    );
});
