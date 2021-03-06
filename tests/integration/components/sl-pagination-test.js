import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

moduleForComponent( 'sl-pagination', 'Integration | Component | sl pagination', {
    integration: true
});

test( 'Default classes are applied', function( assert ) {
    this.render( hbs`
        {{sl-pagination totalPages=1}}
    ` );

    assert.ok(
        this.$( '>:first-child' ).hasClass( 'pagination' ),
        'Default rendered component has class "pagination"'
    );

    assert.ok(
        this.$( '>:first-child' ).hasClass( 'sl-pagination' ),
        'Default rendered component has class "sl-pagination"'
    );
});

test( 'The totalPages property is bound to the total pages display', function( assert ) {
    this.set( 'totalPages', 1 );

    this.render( hbs`
        {{sl-pagination totalPages=totalPages}}
    ` );

    assert.strictEqual(
        this.$( '>:first-child' ).find( 'li:nth-child(2) a' ).text().trim(),
        '1 / 1',
        'totalPages is initialized to 1'
    );

    this.set( 'totalPages', 2 );

    assert.strictEqual(
        this.$( '>:first-child' ).find( 'li:nth-child(2) a' ).text().trim(),
        '1 / 2',
        'totalPages is now set to 2'
    );
});

test( 'The currentPage property is bound to the current page display', function( assert ) {
    this.set( 'currentPage', 1 );

    this.render( hbs`
        {{sl-pagination totalPages=2 currentPage=currentPage}}
    ` );

    assert.strictEqual(
        this.$( '>:first-child' ).find( 'li:nth-child(2) a' ).text().trim(),
        '1 / 2',
        'currentPage is initialized to 1'
    );

    this.set( 'currentPage', 2 );

    assert.strictEqual(
        this.$( '>:first-child' ).find( 'li:nth-child(2) a' ).text().trim(),
        '2 / 2',
        'currentPage is now set to 2'
    );
});

test( 'When totalPages is 1 the previous and next buttons are disabled', function( assert ) {
    this.render( hbs`
        {{sl-pagination totalPages=1}}
    ` );

    assert.ok(
        this.$( '>:first-child' ).find( 'li:first-child' ).hasClass( 'disabled' ),
        'The previous button has the "disabled" class'
    );

    assert.ok(
        this.$( '>:first-child' ).find( 'li:nth-child(3)' ).hasClass( 'disabled' ),
        'The next button has the "disabled" class'
    );
});

test( 'The previous button is disabled when on the first page', function( assert ) {
    const testActionHandler = sinon.spy();

    this.on( 'testAction', testActionHandler );

    this.render( hbs`
        {{sl-pagination totalPages=2 changePage="testAction"}}
    ` );

    assert.ok(
        this.$( '>:first-child' ).find( 'li:first-child' ).hasClass( 'disabled' ),
        'The previous button has the "disabled" class'
    );

    this.$( '>:first-child' ).find( '.previous-page-button' ).click();

    assert.strictEqual(
        this.$( '>:first-child' ).find( 'li:nth-child(2) a' ).text().trim(),
        '1 / 2',
        'The current page displayed has not changed'
    );

    assert.strictEqual(
        testActionHandler.callCount,
        0,
        'changePage action was not called'
    );
});

test( 'The next button is disabled when on the last page', function( assert ) {
    const testActionHandler = sinon.spy();

    this.on( 'testAction', testActionHandler );

    this.render( hbs`
        {{sl-pagination totalPages=2 currentPage=2 changePage="testAction"}}
    ` );

    assert.ok(
        this.$( '>:first-child' ).find( 'li:nth-child(3)' ).hasClass( 'disabled' ),
        'The next button has the "disabled" class'
    );

    this.$( '>:first-child' ).find( '.next-page-button' ).click();

    assert.strictEqual(
        this.$( '>:first-child' ).find( 'li:nth-child(2) a' ).text().trim(),
        '2 / 2',
        'The current page displayed was has not changed'
    );

    assert.strictEqual(
        testActionHandler.callCount,
        0,
        'changePage action was not called'
    );
});

test( 'Neither the previous nor the next button are disabled when not on an internal page', function( assert ) {
    this.render( hbs`
        {{sl-pagination totalPages=3 currentPage=2}}
    ` );

    assert.ok(
        !this.$( '>:first-child' ).find( 'li:first-child' ).hasClass( 'disabled' ),
        'The previous button does not have the "disabled" class'
    );

    assert.ok(
        !this.$( '>:first-child' ).find( 'li:nth-child(3)' ).hasClass( 'disabled' ),
        'The next button does not have the "disabled" class'
    );
});

test( 'Next button click increments the current page and calls the changePage action', function( assert ) {
    const testActionHandler = sinon.spy();

    this.on( 'testAction', testActionHandler );

    this.render( hbs`
        {{sl-pagination totalPages=2 changePage="testAction"}}
    ` );

    this.$( '>:first-child' ).find( '.next-page-button' ).click();

    assert.strictEqual(
        this.$( '>:first-child' ).find( 'li:nth-child(2) a' ).text().trim(),
        '2 / 2',
        'The current page displayed was incremented'
    );

    assert.strictEqual(
        testActionHandler.getCall( 0 ).args[ 0 ],
        2,
        'The changePage action is called with the correct argument'
    );
});

test( 'Previous button click decrements the current page and calls the changePage action', function( assert ) {
    const testActionHandler = sinon.spy();

    this.on( 'testAction', testActionHandler );

    this.render( hbs`
        {{sl-pagination totalPages=2 currentPage=2 changePage="testAction"}}
    ` );

    this.$( '>:first-child' ).find( '.previous-page-button' ).click();

    assert.strictEqual(
        this.$( '>:first-child' ).find( 'li:nth-child(2) a' ).text().trim(),
        '1 / 2',
        'The current page displayed was decremented'
    );

    assert.strictEqual(
        testActionHandler.getCall( 0 ).args[ 0 ],
        1,
        'The changePage action is called with the correct argument'
    );
});
