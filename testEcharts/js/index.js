//1.柱状图
var cylCharts=echarts.init(document.getElementById('cylinder'));
cylCharts.setOption({
    title: {
        text: '柱状图 示例'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});
//2.异步获取数据柱状图
var asynCylCharts=echarts.init(document.getElementById('asynCylinder'));
asynCylCharts.setOption({
    title: {
        text: ''
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: []
    }]
});
$.ajax({
    url:"json/cylinder.json",
    type:"get",
    success:function(res){
        console.log(res);
        asynCylCharts.setOption({
            title: {
                text: res.data.title
            },
            xAxis: {
                data: res.data.categories
            },
            series: [{
                data: res.data.ms
            }]
        });
    }
});
//3.
