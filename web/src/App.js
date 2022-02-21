import axios from 'axios';
import React from 'react'
import { Category, ChartComponent, ColumnSeries, Inject, Legend, LineSeries, SeriesCollectionDirective, SeriesDirective } from '@syncfusion/ej2-react-charts';
// import data from "./data.csv"

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: undefined,
            customData: undefined,
        }
        this.chartData = [
            { month: 'Jan', sales: 35, sales1: 28 }, { month: 'Feb', sales: 28, sales1: 35 },
            { month: 'Mar', sales: 34, sales1: 32 }, { month: 'Apr', sales: 32, sales1: 34 },
            { month: 'May', sales: 40, sales1: 32 }, { month: 'Jun', sales: 32, sales1: 40 },
            { month: 'Jul', sales: 35, sales1: 55 }, { month: 'Aug', sales: 55, sales1: 35 },
            { month: 'Sep', sales: 38, sales1: 30 }, { month: 'Oct', sales: 30, sales1: 38 },
            { month: 'Nov', sales: 25, sales1: 32 }, { month: 'Dec', sales: 32, sales1: 25 }
        ];
        this.primaryxAxis = { valueType: 'Category' };
        this.loadData = this.loadData.bind(this)
        this.checkAlready = this.checkAlready.bind(this)
        this.createMyData = this.createMyData.bind(this)
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        axios.get("http://localhost:8080/data").then((response) => {
            this.setState({ data: response.data })
            this.createMyData()
        });
    }

    checkAlready(object, property, value) {
        for (var it in object) {
            if (object[it].hasOwnProperty(property)) {
                if (object[it][property] === value)
                    return true;
            }
        }
        return false;
    }

    createMyData() {
        var data = [];
        for (var it in this.state.data) {
            if (!this.checkAlready(data, "date", this.state.data[it].date))
                data.push({ date: this.state.data[it].date, nb_unsold: 0, nb_sold: 0, is_unsold: [], sold: [] })
        }
        // eslint-disable-next-line
        this.state.data.map((it) => {
            for (var itCustomData in data) {
                if (data[itCustomData].date === it.date) {
                    if (it["is_unsold"] === "true") {
                        data[itCustomData].is_unsold.push(it)
                        data[itCustomData].nb_unsold += 1
                    } else {
                        data[itCustomData].nb_sold += 1
                        data[itCustomData].sold.push(it)
                    }
                }
            }
        })
        this.setState({ customData: data })
        console.log(this.state.customData)
    }

    render() {
        if (!this.state.data)
            return (
                <div className="App">
                    Data not upload
                </div>
            )
        return (
            <div className="App">
                <ChartComponent id='charts' primaryXAxis={this.primaryxAxis} dataSource={this.state.customData}>
                    <Inject services={[ColumnSeries, Legend, LineSeries, Category]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective xName='date' type='Column' yName='nb_sold' />
                        <SeriesDirective xName='date' type='Column' yName='nb_unsold' />
                    </SeriesCollectionDirective>
                </ChartComponent>
                <div>
                    Number of sold: Green
                </div>
                Number of unsold: Grey
            </div>
        )
    }
}