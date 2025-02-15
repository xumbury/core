'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = MTableBodyRow;

var _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray')
);

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
);

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);

var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties')
);

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _core = require('@material-ui/core');

var _mTableDetailpanel = require('../m-table-detailpanel');

var CommonValues = _interopRequireWildcard(
  require('../../utils/common-values')
);

var _useDoubleClick = require('../../utils/hooks/useDoubleClick');

var _ = require('./..');

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        (0, _defineProperty2['default'])(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function MTableBodyRow(props) {
  var icons = props.icons,
    data = props.data,
    columns = props.columns,
    components = props.components,
    detailPanel = props.detailPanel,
    getFieldValue = props.getFieldValue,
    isTreeData = props.isTreeData,
    onRowSelected = props.onRowSelected,
    onTreeExpandChanged = props.onTreeExpandChanged,
    onToggleDetailPanel = props.onToggleDetailPanel,
    onEditingCanceled = props.onEditingCanceled,
    onEditingApproved = props.onEditingApproved,
    options = props.options,
    hasAnyEditingRow = props.hasAnyEditingRow,
    treeDataMaxLevel = props.treeDataMaxLevel,
    path = props.path,
    localization = props.localization,
    actions = props.actions,
    errorState = props.errorState,
    cellEditable = props.cellEditable,
    onCellEditStarted = props.onCellEditStarted,
    onCellEditFinished = props.onCellEditFinished,
    persistEvents = props.persistEvents,
    scrollWidth = props.scrollWidth,
    onRowClick = props.onRowClick,
    onRowDoubleClick = props.onRowDoubleClick,
    rowProps = (0, _objectWithoutProperties2['default'])(props, [
      'icons',
      'data',
      'columns',
      'components',
      'detailPanel',
      'getFieldValue',
      'isTreeData',
      'onRowSelected',
      'onTreeExpandChanged',
      'onToggleDetailPanel',
      'onEditingCanceled',
      'onEditingApproved',
      'options',
      'hasAnyEditingRow',
      'treeDataMaxLevel',
      'path',
      'localization',
      'actions',
      'errorState',
      'cellEditable',
      'onCellEditStarted',
      'onCellEditFinished',
      'persistEvents',
      'scrollWidth',
      'onRowClick',
      'onRowDoubleClick'
    ]);

  var onClick = function onClick(event, callback) {
    return callback(event, data, function (panelIndex) {
      var panel = detailPanel;

      if (Array.isArray(panel)) {
        panel = panel[panelIndex || 0];

        if (typeof panel === 'function') {
          panel = panel(data);
        }

        panel = panel.render;
      }

      onToggleDetailPanel(path, panel);
    });
  };

  var handleOnRowClick = (0, _useDoubleClick.useDoubleClick)(
    onRowClick
      ? function (e) {
          return onClick(e, onRowClick);
        }
      : undefined,
    onRowDoubleClick
      ? function (e) {
          return onClick(e, onRowDoubleClick);
        }
      : undefined
  );

  var getRenderColumns = function getRenderColumns() {
    var size = CommonValues.elementSize(props);
    var mapArr = props.columns
      .filter(function (columnDef) {
        return !columnDef.hidden && !(columnDef.tableData.groupOrder > -1);
      })
      .sort(function (a, b) {
        return a.tableData.columnOrder - b.tableData.columnOrder;
      })
      .map(function (columnDef, index) {
        var value = props.getFieldValue(props.data, columnDef);

        if (
          props.data.tableData.editCellList &&
          props.data.tableData.editCellList.find(function (c) {
            return c.tableData.id === columnDef.tableData.id;
          })
        ) {
          return /*#__PURE__*/ _react['default'].createElement(
            props.components.EditCell,
            {
              getFieldValue: props.getFieldValue,
              components: props.components,
              icons: props.icons,
              localization: props.localization,
              columnDef: columnDef,
              size: size,
              key:
                'cell-' +
                props.data.tableData.id +
                '-' +
                columnDef.tableData.id,
              rowData: props.data,
              cellEditable: props.cellEditable,
              onCellEditFinished: props.onCellEditFinished,
              scrollWidth: props.scrollWidth
            }
          );
        } else {
          var isEditable =
            columnDef.editable !== 'never' && !!props.cellEditable;

          if (isEditable && props.cellEditable.isCellEditable) {
            isEditable = props.cellEditable.isCellEditable(
              props.data,
              columnDef
            );
          }

          var key = 'cell-'
            .concat(props.data.tableData.id, '-')
            .concat(columnDef.tableData.id);
          return /*#__PURE__*/ _react['default'].createElement(
            props.components.Cell,
            {
              size: size,
              errorState: props.errorState,
              icons: props.icons,
              columnDef: _objectSpread(
                {
                  cellStyle: props.options.cellStyle
                },
                columnDef
              ),
              value: value,
              key: key,
              rowData: props.data,
              cellEditable: isEditable,
              onCellEditStarted: props.onCellEditStarted,
              scrollWidth: props.scrollWidth
            }
          );
        }
      });
    return mapArr;
  };

  var renderActions = function renderActions(actions) {
    var size = CommonValues.elementSize(props);
    var width = actions.length * CommonValues.baseIconSize(props);
    return /*#__PURE__*/ _react['default'].createElement(
      _core.TableCell,
      {
        size: size,
        padding: 'none',
        key: 'key-actions-column',
        style: _objectSpread(
          {
            width: width,
            padding: '0px 5px',
            boxSizing: 'border-box'
          },
          props.options.actionsCellStyle
        )
      },
      /*#__PURE__*/ _react['default'].createElement(props.components.Actions, {
        data: props.data,
        actions: actions,
        components: props.components,
        size: size,
        disabled: props.hasAnyEditingRow
      })
    );
  };

  var renderSelectionColumn = function renderSelectionColumn() {
    var checkboxProps = props.options.selectionProps || {};

    if (typeof checkboxProps === 'function') {
      checkboxProps = checkboxProps(props.data);
    }

    var size = CommonValues.elementSize(props);
    var selectionWidth =
      CommonValues.selectionMaxWidth(props, props.treeDataMaxLevel) || 0;
    var styles =
      size === 'medium'
        ? {
            marginLeft: props.level * 9 || 0
          }
        : {
            padding: '4px',
            marginLeft: 5 + props.level * 9 || 0
          };
    return /*#__PURE__*/ _react['default'].createElement(
      _core.TableCell,
      {
        size: size,
        padding: 'none',
        key: 'key-selection-column',
        style: {
          width: selectionWidth
        }
      },
      /*#__PURE__*/ _react['default'].createElement(
        _core.Checkbox,
        (0, _extends2['default'])(
          {
            size: size,
            checked: props.data.tableData.checked === true,
            onClick: function onClick(e) {
              return e.stopPropagation();
            },
            value: props.data.tableData.id.toString(),
            onChange: function onChange(event) {
              props.onRowSelected(event, props.path, props.data);
            },
            style: styles
          },
          checkboxProps
        )
      )
    );
  };

  var rotateIconStyle = function rotateIconStyle(isOpen) {
    return {
      transform: isOpen ? 'rotate(90deg)' : 'none'
    };
  };

  var renderDetailPanelColumn = function renderDetailPanelColumn() {
    if (!props.options.showDetailPanelIcon) {
      return null;
    }

    var size = CommonValues.elementSize(props);

    if (typeof props.detailPanel === 'function') {
      return /*#__PURE__*/ _react['default'].createElement(
        _core.TableCell,
        {
          size: size,
          padding: 'none',
          key: 'key-detail-panel-column',
          style: _objectSpread(
            {
              width: 42,
              textAlign: 'center'
            },
            props.options.detailPanelColumnStyle
          )
        },
        /*#__PURE__*/ _react['default'].createElement(
          _core.IconButton,
          {
            'aria-label': 'Detail panel visibility toggle',
            size: size,
            style: _objectSpread(
              {
                transition: 'all ease 200ms'
              },
              rotateIconStyle(props.data.tableData.showDetailPanel)
            ),
            onClick: function onClick(event) {
              props.onToggleDetailPanel(props.path, props.detailPanel);
              event.stopPropagation();
            }
          },
          /*#__PURE__*/ _react['default'].createElement(
            props.icons.DetailPanel,
            null
          )
        )
      );
    } else {
      return /*#__PURE__*/ _react['default'].createElement(
        _core.TableCell,
        {
          size: size,
          padding: 'none',
          key: 'key-detail-panel-column'
        },
        /*#__PURE__*/ _react['default'].createElement(
          'div',
          {
            style: _objectSpread(
              {
                width: 42 * props.detailPanel.length,
                textAlign: 'center',
                display: 'flex'
              },
              props.options.detailPanelColumnStyle
            )
          },
          props.detailPanel.map(function (panel, index) {
            if (typeof panel === 'function') {
              panel = panel(props.data);
            }

            var isOpen =
              (props.data.tableData.showDetailPanel || '').toString() ===
              panel.render.toString();

            var iconButton = /*#__PURE__*/ _react['default'].createElement(
              props.icons.DetailPanel,
              null
            );

            var animation = true;

            if (isOpen) {
              if (panel.openIcon) {
                iconButton = /*#__PURE__*/ _react['default'].createElement(
                  _.MTableCustomIcon,
                  {
                    icon: panel.openIcon,
                    iconProps: panel.iconProps
                  }
                );
                animation = false;
              } else if (panel.icon) {
                iconButton = /*#__PURE__*/ _react['default'].createElement(
                  _.MTableCustomIcon,
                  {
                    icon: panel.icon,
                    iconProps: panel.iconProps
                  }
                );
              }
            } else if (panel.icon) {
              iconButton = /*#__PURE__*/ _react['default'].createElement(
                _.MTableCustomIcon,
                {
                  icon: panel.icon,
                  iconProps: panel.iconProps
                }
              );
              animation = false;
            }

            iconButton = /*#__PURE__*/ _react['default'].createElement(
              _core.IconButton,
              {
                'aria-label': 'Detail panel visibility toggle',
                size: size,
                key: 'key-detail-panel-' + index,
                style: _objectSpread(
                  {
                    transition: 'all ease 200ms'
                  },
                  rotateIconStyle(animation && isOpen)
                ),
                disabled: panel.disabled,
                onClick: function onClick(event) {
                  props.onToggleDetailPanel(props.path, panel.render);
                  event.stopPropagation();
                }
              },
              iconButton
            );

            if (panel.tooltip) {
              iconButton = /*#__PURE__*/ _react['default'].createElement(
                _core.Tooltip,
                {
                  key: 'key-detail-panel-' + index,
                  title: panel.tooltip
                },
                iconButton
              );
            }

            return iconButton;
          })
        )
      );
    }
  };

  var renderTreeDataColumn = function renderTreeDataColumn() {
    var size = CommonValues.elementSize(props);

    if (
      props.data.tableData.childRows &&
      props.data.tableData.childRows.length > 0
    ) {
      return /*#__PURE__*/ _react['default'].createElement(
        _core.TableCell,
        {
          size: size,
          padding: 'none',
          key: 'key-tree-data-column',
          style: {
            width: 48 + 9 * (props.treeDataMaxLevel - 2)
          }
        },
        /*#__PURE__*/ _react['default'].createElement(
          _core.IconButton,
          {
            'aria-label': 'Detail panel visibility toggle',
            size: size,
            style: _objectSpread(
              {
                transition: 'all ease 200ms',
                marginLeft: props.level * 9
              },
              rotateIconStyle(props.data.tableData.isTreeExpanded)
            ),
            onClick: function onClick(event) {
              props.onTreeExpandChanged(props.path, props.data);
              event.stopPropagation();
            }
          },
          /*#__PURE__*/ _react['default'].createElement(
            props.icons.DetailPanel,
            null
          )
        )
      );
    } else {
      return /*#__PURE__*/ _react['default'].createElement(_core.TableCell, {
        padding: 'none',
        key: 'key-tree-data-column'
      });
    }
  };

  var getStyle = function getStyle(index, level) {
    var style = {};

    if (typeof props.options.rowStyle === 'function') {
      style = _objectSpread(
        _objectSpread({}, style),
        props.options.rowStyle(props.data, index, level, props.hasAnyEditingRow)
      );
    } else if (props.options.rowStyle) {
      style = _objectSpread(_objectSpread({}, style), props.options.rowStyle);
    }

    if (onRowClick || onRowDoubleClick) {
      style.cursor = 'pointer';
    }

    if (props.hasAnyEditingRow) {
      style.opacity = style.opacity ? style.opacity : 0.2;
    }

    return style;
  };

  var size = CommonValues.elementSize(props);
  var renderColumns = getRenderColumns();

  if (props.options.selection) {
    renderColumns.splice(0, 0, renderSelectionColumn());
  }

  var rowActions = CommonValues.rowActions(props);

  if (rowActions.length > 0) {
    if (props.options.actionsColumnIndex === -1) {
      renderColumns.push(renderActions(rowActions));
    } else if (props.options.actionsColumnIndex >= 0) {
      var endPos = 0;

      if (props.options.selection) {
        endPos = 1;
      }

      renderColumns.splice(
        props.options.actionsColumnIndex + endPos,
        0,
        renderActions(rowActions)
      );
    }
  } // Then we add detail panel icon

  if (props.detailPanel) {
    if (props.options.detailPanelColumnAlignment === 'right') {
      renderColumns.push(renderDetailPanelColumn());
    } else {
      renderColumns.splice(0, 0, renderDetailPanelColumn());
    }
  } // Lastly we add tree data icon

  if (props.isTreeData) {
    renderColumns.splice(0, 0, renderTreeDataColumn());
  }

  props.columns
    .filter(function (columnDef) {
      return columnDef.tableData.groupOrder > -1;
    })
    .forEach(function (columnDef) {
      renderColumns.splice(
        0,
        0,
        /*#__PURE__*/ _react['default'].createElement(_core.TableCell, {
          size: size,
          padding: 'none',
          key: 'key-group-cell' + columnDef.tableData.id
        })
      );
    });
  return /*#__PURE__*/ _react['default'].createElement(
    _react['default'].Fragment,
    null,
    /*#__PURE__*/ _react['default'].createElement(
      _core.TableRow,
      (0, _extends2['default'])(
        {
          selected: hasAnyEditingRow
        },
        rowProps,
        {
          onClick: function onClick(event) {
            if (persistEvents) {
              event.persist();
            }

            handleOnRowClick(event);
          },
          hover: onRowClick !== null || onRowDoubleClick !== null,
          style: getStyle(props.index, props.level)
        }
      ),
      renderColumns
    ),
    /*#__PURE__*/ _react['default'].createElement(
      _mTableDetailpanel.MTableDetailPanel,
      {
        options: props.options,
        data: props.data,
        detailPanel: props.detailPanel,
        renderColumns: renderColumns,
        size: size
      }
    ),
    props.data.tableData.childRows &&
      props.data.tableData.isTreeExpanded &&
      props.data.tableData.childRows.map(function (data, index) {
        if (data.tableData.editing) {
          return /*#__PURE__*/ _react['default'].createElement(
            props.components.EditRow,
            {
              columns: props.columns.filter(function (columnDef) {
                return !columnDef.hidden;
              }),
              components: props.components,
              data: data,
              icons: props.icons,
              localization: props.localization,
              getFieldValue: props.getFieldValue,
              key: index,
              mode: data.tableData.editing,
              options: props.options,
              isTreeData: props.isTreeData,
              detailPanel: props.detailPanel,
              onEditingCanceled: onEditingCanceled,
              onEditingApproved: onEditingApproved,
              errorState: props.errorState
            }
          );
        } else {
          return /*#__PURE__*/ _react['default'].createElement(
            props.components.Row,
            (0, _extends2['default'])({}, props, {
              data: data,
              index: index,
              key: index,
              level: props.level + 1,
              path: [].concat((0, _toConsumableArray2['default'])(props.path), [
                index
              ]),
              onEditingCanceled: onEditingCanceled,
              onEditingApproved: onEditingApproved,
              hasAnyEditingRow: props.hasAnyEditingRow,
              treeDataMaxLevel: treeDataMaxLevel,
              errorState: props.errorState,
              cellEditable: cellEditable,
              onCellEditStarted: onCellEditStarted,
              onCellEditFinished: onCellEditFinished
            })
          );
        }
      })
  );
}

MTableBodyRow.defaultProps = {
  actions: [],
  index: 0,
  data: {},
  options: {},
  path: [],
  persistEvents: false
};
MTableBodyRow.propTypes = {
  actions: _propTypes['default'].array,
  icons: _propTypes['default'].any.isRequired,
  index: _propTypes['default'].number.isRequired,
  data: _propTypes['default'].object.isRequired,
  detailPanel: _propTypes['default'].oneOfType([
    _propTypes['default'].func,
    _propTypes['default'].arrayOf(
      _propTypes['default'].oneOfType([
        _propTypes['default'].object,
        _propTypes['default'].func
      ])
    )
  ]),
  hasAnyEditingRow: _propTypes['default'].bool,
  options: _propTypes['default'].object.isRequired,
  onRowSelected: _propTypes['default'].func,
  path: _propTypes['default'].arrayOf(_propTypes['default'].number),
  persistEvents: _propTypes['default'].bool,
  treeDataMaxLevel: _propTypes['default'].number,
  getFieldValue: _propTypes['default'].func.isRequired,
  columns: _propTypes['default'].array,
  onToggleDetailPanel: _propTypes['default'].func.isRequired,
  onRowClick: _propTypes['default'].func,
  onRowDoubleClick: _propTypes['default'].func,
  onEditingApproved: _propTypes['default'].func,
  onEditingCanceled: _propTypes['default'].func,
  errorState: _propTypes['default'].oneOfType([
    _propTypes['default'].object,
    _propTypes['default'].bool
  ])
};
