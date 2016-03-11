// React Basics
// state.var -> defined in the component
// props.var -> passed in to the component
// event.target.var -> get value from html tag

/*
 * Counter component demonstates the use of 'state'
 * Variables created in the component are saved in state and
 * can be accessed with this.state.variable_name
 */
var Counter = React.createClass({
    getInitialState: function () {
        return { clickCount: 0 };
    },
    handleClick: function () {
        this.setState({clickCount: this.state.clickCount + 1});
    },
    render: function () {
        return (<h2 onClick={this.handleClick}>Click me! Number of clicks: {this.state.clickCount}</h2>);
    }
});

/*
 * Textbox component demonstates the use of 'state' and 'event'
 * It shows how to grab data from html elements using event.target
 */
var Textbox = React.createClass({
    getInitialState: function() {
        return {value: 'Hello!'};
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    render: function() {
        return (
            // All html must be within a parent tag
            <div className="component">
                <input
                    type="text"
                    placeholder="Type a message"
                    onChange={this.handleChange}
                />
                <h2>Message: {this.state.value}</h2>
            </div>
        );
    }
});

/*
 * FilteredList component demonstates the using multiple components
 * and passing state information from a parent to child component
 */
var FilteredList = React.createClass({
    getInitialState: function() {
        return {
            initialItems: [
                "Apples",
                "Broccoli",
                "Chicken",
                "Duck",
                "Eggs",
                "Fish",
                "Granola",
                "Hash Browns"
            ],
            items: [
                "Apples",
                "Broccoli",
                "Chicken",
                "Duck",
                "Eggs",
                "Fish",
                "Granola",
                "Hash Browns"
            ]
        }
    },
    filterList: function(evt) {
        var prefix = evt.target.value;
        var updatedList = [].concat(this.state.initialItems);
        updatedList = updatedList.filter(function(item){
            return item.toLowerCase().search(prefix.toLowerCase()) !== -1;
        });
        this.setState({items: updatedList});
        },
    render: function() {
        return (
            <div className="filter-list">
                <input
                    type="text"
                    placeholder="Filter search"
                    onChange={this.filterList}
                />
                <List items={this.state.items}/>
            </div>
        );
    }
});

var List = React.createClass({
    render: function(){
        return (
            <ul>
            {
                this.props.items.map(function(item) {
                    return <li key={item}>{item}</li>
                })
            }
            </ul>
        )
    }
});

/*
 * TODO List
 */
var Todo = React.createClass({
    getInitialState: function () {
        return {
            items: [
                'Add remove todo functionality'
            ]
        };
    },
    addTodo: function(event) {
        event.preventDefault()
        // NEVER mutate this.state directly
        var new_items = [].concat(this.state.items);
        // Is there a better way to get input value other than refs?
        var todo = this.refs.input.value
        this.refs.input.value = ''
        new_items.push(todo)
        this.setState({items: new_items});
    },
    render: function(){
        return (
            <div className="todo">
                <form onSubmit={this.addTodo}>
                    <input type="text" ref="input" placeholder="Filter search" />
                    <input type="submit" value="Add" />
                </form>
                <TodoList items={this.state.items} />
            </div>
        );
    }
});

var TodoList = React.createClass({
    render: function() {
        return (
            <ul>
            {
                this.props.items.map(function(item) {
                    return <li>{item}</li>
                })
            }
            </ul>
        );
    }
});

ReactDOM.render(
    <Counter />,
    document.getElementById('counter'));

ReactDOM.render(
    <Textbox />,
    document.getElementById('message'));

ReactDOM.render(
    <FilteredList />,
    document.getElementById('filter-list'));

ReactDOM.render(
    <Todo />,
    document.getElementById('todo'));

