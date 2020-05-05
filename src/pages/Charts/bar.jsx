import React, { Component } from 'react'
import { Card, Button } from 'antd'
import  ReactEcharts from 'echarts-for-react'


export default class Bar extends Component {
    
    getOption = () => {
        return {
            title: {
                text: 'ECharts 入门实例'
            },
            tooltip:{},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","裤子"]
            },
            yAxis: {},
            series:[{
                name: '销量',
                type: 'bar',
                data:[5,20,36],
            }]
        }
    }
    render() {
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.update}>更新</Button>
                </Card>
                <Card title='柱形图一'>
                 <ReactEcharts option={this.getOption()} />
                </Card>
            </div>
        )
    }
}
