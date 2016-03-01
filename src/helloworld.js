var Counter = React.createClass({
    getInitialState: function () {
        return { clickCount: 0 };
    },
    handleClick: function () {
        this.setState(function(state) {
            return {clickCount: state.clickCount + 1};
        });
    },
    render: function () {
        return (<h2 onClick={this.handleClick}>Click me! Number of clicks: {this.state.clickCount}</h2>);
    }
});

var Textbox = React.createClass({
    getInitialState: function() {
        return {value: 'Hello!'};
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    render: function() {
        return (
            <div className="component">
                <input
                    type="text"
                    placeholder="Message"
                    onChange={this.handleChange}
                />
                <h1>Message: {this.state.value}</h1>
            </div>
        );
    }
});


// state.var -> defined in the component
// props.var -> passed in to the component
// event.target.var -> get value from html tag

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
                    placeholder="Search"
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

ReactDOM.render(
    <Textbox />,
    document.getElementById('message'));

ReactDOM.render(
    <FilteredList/>,
    document.getElementById('filter-list'));

