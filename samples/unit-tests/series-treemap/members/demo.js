QUnit.test('seriesTypes.treemap.pointClass.setState', function (assert) {
    var series = Highcharts.seriesTypes.treemap,
        setState = series.prototype.pointClass.prototype.setState,
        pointAttribs = series.prototype.pointAttribs,
        noop = Highcharts.noop,
        point = {
            node: {},
            graphic: {
                attr: function (obj) {
                    var graphic = this,
                        keys = Object.keys(obj);
                    keys.forEach(function (key) {
                        var value = obj[key];
                        graphic[key] = value;
                    });
                },
                addClass: noop,
                removeClass: noop
            },
            getClassName: function () {
                return '';
            },
            series: {
                type: 'treemap',
                levelMap: {},
                options: {
                    states: {
                        hover: {},
                        select: {}
                    }
                },
                pointAttribs: pointAttribs,
                zones: []
            }
        };
    setState.call(point, '');
    assert.strictEqual(
        point.graphic.zIndex,
        0,
        'When state:normal zIndex is 0'
    );
    setState.call(point, 'hover');
    assert.strictEqual(
        point.graphic.zIndex,
        1,
        'When state:hover zIndex is 1'
    );
    setState.call(point, 'select');
    assert.strictEqual(
        point.graphic.zIndex,
        0,
        'When state:select zIndex is 0'
    );
});

QUnit.test('seriesTypes.treemap.drillUp', function (assert) {
    var drillUp = Highcharts.seriesTypes.treemap.prototype.drillUp,
        series = {
            rootNode: '',
            drillToNode: function (id) {
                this.rootNode = id;
            },
            nodeMap: {
                '': {},
                'A': { parent: '' }
            }
        };
    drillUp.call(series);
    assert.strictEqual(
        series.rootNode,
        '',
        'Do not drill up when root node does not have a parent'
    );

    series.rootNode = 'B';
    drillUp.call(series);
    assert.strictEqual(
        series.rootNode,
        'B',
        'Do not drill when root node does not exist'
    );

    series.rootNode = 'A';
    drillUp.call(series);
    assert.strictEqual(
        series.rootNode,
        '',
        'Drill to parent'
    );
});
