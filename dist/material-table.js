'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
);

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
);

var _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray')
);

var _typeof2 = _interopRequireDefault(require('@babel/runtime/helpers/typeof'));

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
);

var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
);

var _assertThisInitialized2 = _interopRequireDefault(
  require('@babel/runtime/helpers/assertThisInitialized')
);

var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits')
);

var _possibleConstructorReturn2 = _interopRequireDefault(
  require('@babel/runtime/helpers/possibleConstructorReturn')
);

var _getPrototypeOf2 = _interopRequireDefault(
  require('@babel/runtime/helpers/getPrototypeOf')
);

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);

var _react = _interopRequireDefault(require('react'));

var _debounce = require('debounce');

var _react2 = _interopRequireDefault(require('fast-deep-equal/react'));

var _cloneDeep = _interopRequireDefault(require('lodash/cloneDeep'));

var _core = require('@material-ui/core');

var _reactBeautifulDnd = require('react-beautiful-dnd');

var _dataManager = _interopRequireDefault(require('./utils/data-manager'));

var CommonValues = _interopRequireWildcard(require('./utils/common-values'));

var _components = require('./components');

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

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2['default'])(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2['default'])(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return (0, _possibleConstructorReturn2['default'])(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

var MaterialTable = /*#__PURE__*/ (function (_React$Component) {
  (0, _inherits2['default'])(MaterialTable, _React$Component);

  var _super = _createSuper(MaterialTable);

  function MaterialTable(_props) {
    var _this;

    (0, _classCallCheck2['default'])(this, MaterialTable);
    _this = _super.call(this, _props);
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'dataManager',
      new _dataManager['default']()
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'checkedForFunctions',
      false
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'isRemoteData',
      function (props) {
        return !Array.isArray((props || _this.props).data);
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'isOutsidePageNumbers',
      function (props) {
        return props.page !== undefined && props.totalCount !== undefined;
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onAllSelected',
      function (checked) {
        _this.dataManager.changeAllSelected(
          checked,
          _this.props.options.selectionProps
        );

        _this.setState(_this.dataManager.getRenderState(), function () {
          return _this.onSelectionChange();
        });
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onGroupSelected',
      function (checked, path) {
        _this.dataManager.changeGroupSelected(checked, path);

        _this.setState(_this.dataManager.getRenderState(), function () {
          return _this.onSelectionChange();
        });
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onChangeColumnHidden',
      function (column, hidden) {
        _this.dataManager.changeColumnHidden(column, hidden);

        _this.setState(_this.dataManager.getRenderState(), function () {
          _this.props.onChangeColumnHidden &&
            _this.props.onChangeColumnHidden(column, hidden);
        });
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onChangeGroupOrder',
      function (groupedColumn) {
        _this.dataManager.changeGroupOrder(groupedColumn.tableData.id);

        _this.setState(_this.dataManager.getRenderState());
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onChangeOrder',
      function (orderBy, orderDirection) {
        var newOrderBy = orderDirection === '' ? -1 : orderBy;

        _this.dataManager.changeOrder(newOrderBy, orderDirection);

        if (_this.isRemoteData()) {
          var query = _objectSpread({}, _this.state.query);

          query.page = 0;
          query.orderBy = _this.state.columns.find(function (a) {
            return a.tableData.id === newOrderBy;
          });
          query.orderDirection = orderDirection;

          _this.onQueryChange(query, function () {
            _this.props.onOrderChange &&
              _this.props.onOrderChange(newOrderBy, orderDirection);
          });
        } else {
          _this.setState(_this.dataManager.getRenderState(), function () {
            _this.props.onOrderChange &&
              _this.props.onOrderChange(newOrderBy, orderDirection);
          });
        }
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onPageChange',
      function (event, page) {
        if (_this.isRemoteData()) {
          var query = _objectSpread({}, _this.state.query);

          query.page = page;

          _this.onQueryChange(query, function () {
            _this.props.onPageChange &&
              _this.props.onPageChange(page, query.pageSize);
          });
        } else {
          if (!_this.isOutsidePageNumbers(_this.props)) {
            _this.dataManager.changeCurrentPage(page);
          }

          _this.setState(_this.dataManager.getRenderState(), function () {
            _this.props.onPageChange &&
              _this.props.onPageChange(page, _this.state.pageSize);
          });
        }
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onRowsPerPageChange',
      function (event) {
        var pageSize = event.target.value;

        _this.dataManager.changePageSize(pageSize);

        _this.props.onPageChange && _this.props.onPageChange(0, pageSize);

        if (_this.isRemoteData()) {
          var query = _objectSpread({}, _this.state.query);

          query.pageSize = event.target.value;
          query.page = 0;

          _this.onQueryChange(query, function () {
            _this.props.onRowsPerPageChange &&
              _this.props.onRowsPerPageChange(pageSize);
          });
        } else {
          _this.dataManager.changeCurrentPage(0);

          _this.setState(_this.dataManager.getRenderState(), function () {
            _this.props.onRowsPerPageChange &&
              _this.props.onRowsPerPageChange(pageSize);
          });
        }
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onDragEnd',
      function (result) {
        if (!result || !result.source || !result.destination) return;

        _this.dataManager.changeByDrag(result);

        _this.setState(_this.dataManager.getRenderState(), function () {
          if (
            _this.props.onColumnDragged &&
            result.destination.droppableId === 'headers' &&
            result.source.droppableId === 'headers'
          ) {
            _this.props.onColumnDragged(
              result.source.index,
              result.destination.index
            );
          }
        });
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onGroupExpandChanged',
      function (path) {
        _this.dataManager.changeGroupExpand(path);

        _this.setState(_this.dataManager.getRenderState());
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onGroupRemoved',
      function (groupedColumn, index) {
        var result = {
          combine: null,
          destination: {
            droppableId: 'headers',
            index: 0
          },
          draggableId: groupedColumn.tableData.id,
          mode: 'FLUID',
          reason: 'DROP',
          source: {
            index: index,
            droppableId: 'groups'
          },
          type: 'DEFAULT'
        };

        _this.dataManager.changeByDrag(result);

        _this.setState(_this.dataManager.getRenderState(), function () {
          _this.props.onGroupRemoved &&
            _this.props.onGroupRemoved(groupedColumn, index);
        });
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onEditingApproved',
      function (mode, newData, oldData) {
        if (
          mode === 'add' &&
          _this.props.editable &&
          _this.props.editable.onRowAdd
        ) {
          _this.setState(
            {
              isLoading: true
            },
            function () {
              _this.props.editable
                .onRowAdd(newData)
                .then(function (result) {
                  _this.setState(
                    {
                      isLoading: false,
                      showAddRow: false
                    },
                    function () {
                      if (_this.isRemoteData()) {
                        _this.onQueryChange(_this.state.query);
                      }
                    }
                  );
                })
                ['catch'](function (reason) {
                  var errorState = {
                    message: reason,
                    errorCause: 'add'
                  };

                  _this.setState({
                    isLoading: false,
                    errorState: errorState
                  });
                });
            }
          );
        } else if (
          mode === 'update' &&
          _this.props.editable &&
          _this.props.editable.onRowUpdate
        ) {
          _this.setState(
            {
              isLoading: true
            },
            function () {
              _this.props.editable
                .onRowUpdate(newData, oldData)
                .then(function (result) {
                  _this.dataManager.changeRowEditing(oldData);

                  _this.setState(
                    _objectSpread(
                      {
                        isLoading: false
                      },
                      _this.dataManager.getRenderState()
                    ),
                    function () {
                      if (_this.isRemoteData()) {
                        _this.onQueryChange(_this.state.query);
                      }
                    }
                  );
                })
                ['catch'](function (reason) {
                  var errorState = {
                    message: reason,
                    errorCause: 'update'
                  };

                  _this.setState({
                    isLoading: false,
                    errorState: errorState
                  });
                });
            }
          );
        } else if (
          mode === 'delete' &&
          _this.props.editable &&
          _this.props.editable.onRowDelete
        ) {
          _this.setState(
            {
              isLoading: true
            },
            function () {
              _this.props.editable
                .onRowDelete(oldData)
                .then(function (result) {
                  _this.dataManager.changeRowEditing(oldData);

                  _this.setState(
                    _objectSpread(
                      {
                        isLoading: false
                      },
                      _this.dataManager.getRenderState()
                    ),
                    function () {
                      if (_this.isRemoteData()) {
                        _this.onQueryChange(_this.state.query);
                      }
                    }
                  );
                })
                ['catch'](function (reason) {
                  var errorState = {
                    message: reason,
                    errorCause: 'delete'
                  };

                  _this.setState({
                    isLoading: false,
                    errorState: errorState
                  });
                });
            }
          );
        } else if (
          mode === 'bulk' &&
          _this.props.editable &&
          _this.props.editable.onBulkUpdate
        ) {
          _this.setState(
            {
              isLoading: true
            },
            function () {
              _this.props.editable
                .onBulkUpdate(_this.dataManager.bulkEditChangedRows)
                .then(function (result) {
                  _this.dataManager.changeBulkEditOpen(false);

                  _this.props.onBulkEditOpen &&
                    _this.props.onBulkEditOpen(false);

                  _this.dataManager.clearBulkEditChangedRows();

                  _this.setState(
                    _objectSpread(
                      {
                        isLoading: false
                      },
                      _this.dataManager.getRenderState()
                    ),
                    function () {
                      if (_this.isRemoteData()) {
                        _this.onQueryChange(_this.state.query);
                      }
                    }
                  );
                })
                ['catch'](function (reason) {
                  var errorState = {
                    message: reason,
                    errorCause: 'bulk edit'
                  };

                  _this.setState({
                    isLoading: false,
                    errorState: errorState
                  });
                });
            }
          );
        }
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onEditingCanceled',
      function (mode, rowData) {
        if (mode === 'add') {
          _this.props.editable.onRowAddCancelled &&
            _this.props.editable.onRowAddCancelled();

          _this.setState({
            showAddRow: false
          });
        } else if (mode === 'update') {
          _this.props.editable.onRowUpdateCancelled &&
            _this.props.editable.onRowUpdateCancelled();

          _this.dataManager.changeRowEditing(rowData);

          _this.setState(_this.dataManager.getRenderState());
        } else if (mode === 'delete') {
          _this.dataManager.changeRowEditing(rowData);

          _this.setState(_this.dataManager.getRenderState());
        }
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'retry',
      function () {
        _this.onQueryChange(_this.state.query);
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onQueryChange',
      function (query, callback) {
        query = _objectSpread(
          _objectSpread(_objectSpread({}, _this.state.query), query),
          {},
          {
            error: _this.state.errorState
          }
        );

        _this.setState(
          {
            isLoading: true,
            errorState: undefined
          },
          function () {
            _this.props
              .data(query)
              .then(function (result) {
                query.totalCount = result.totalCount;
                query.page = result.page;

                var nextQuery = _objectSpread(
                  _objectSpread({}, query),
                  {},
                  {
                    totalCount: result.totalCount,
                    page: result.page
                  }
                );

                _this.dataManager.setData(result.data);

                _this.setState(
                  _objectSpread(
                    _objectSpread(
                      {
                        isLoading: false,
                        errorState: false
                      },
                      _this.dataManager.getRenderState()
                    ),
                    {},
                    {
                      query: nextQuery
                    }
                  ),
                  function () {
                    callback && callback();
                  }
                );
              })
              ['catch'](function (error) {
                var localization = _objectSpread(
                  _objectSpread({}, MaterialTable.defaultProps.localization),
                  _this.props.localization
                );

                var errorState = {
                  message:
                    (0, _typeof2['default'])(error) === 'object'
                      ? error.message
                      : error !== undefined
                      ? error
                      : localization.error,
                  errorCause: 'query'
                };

                _this.setState(
                  _objectSpread(
                    {
                      isLoading: false,
                      errorState: errorState
                    },
                    _this.dataManager.getRenderState()
                  )
                );
              });
          }
        );
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onRowSelected',
      function (event, path, dataClicked) {
        _this.dataManager.changeRowSelected(event.target.checked, path);

        _this.setState(_this.dataManager.getRenderState(), function () {
          return _this.onSelectionChange(dataClicked);
        });
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onSelectionChange',
      function (dataClicked) {
        if (_this.props.onSelectionChange) {
          var selectedRows = [];

          var findSelecteds = function findSelecteds(list) {
            list.forEach(function (row) {
              if (row.tableData.checked) {
                selectedRows.push(row);
              }
            });
          };

          findSelecteds(_this.state.originalData);

          _this.props.onSelectionChange(selectedRows, dataClicked);
        }
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onSearchChangeDebounce',
      (0, _debounce.debounce)(function (searchText) {
        if (_this.isRemoteData()) {
          var query = _objectSpread({}, _this.state.query);

          query.page = 0;
          query.search = searchText;

          _this.onQueryChange(query);
        } else {
          _this.setState(_this.dataManager.getRenderState(), function () {
            _this.props.onSearchChange &&
              _this.props.onSearchChange(searchText);
          });
        }
      }, _this.props.options.debounceInterval)
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onFilterChange',
      function (columnId, value) {
        _this.dataManager.changeFilterValue(columnId, value);

        _this.setState({}, _this.onFilterChangeDebounce);
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onFilterChangeDebounce',
      (0, _debounce.debounce)(function () {
        if (_this.isRemoteData()) {
          var query = _objectSpread({}, _this.state.query);

          query.page = 0;
          query.filters = _this.state.columns
            .filter(function (a) {
              return a.tableData.filterValue;
            })
            .map(function (a) {
              return {
                column: a,
                operator: '=',
                value: a.tableData.filterValue
              };
            });

          _this.onQueryChange(query);
        } else {
          _this.setState(_this.dataManager.getRenderState(), function () {
            if (_this.props.onFilterChange) {
              var appliedFilters = _this.state.columns
                .filter(function (a) {
                  return a.tableData.filterValue;
                })
                .map(function (a) {
                  return {
                    column: a,
                    operator: '=',
                    value: a.tableData.filterValue
                  };
                });

              _this.props.onFilterChange(appliedFilters);
            }
          });
        }
      }, _this.props.options.debounceInterval)
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onTreeExpandChanged',
      function (path, data) {
        _this.dataManager.changeTreeExpand(path);

        _this.setState(_this.dataManager.getRenderState(), function () {
          _this.props.onTreeExpandChange &&
            _this.props.onTreeExpandChange(data, data.tableData.isTreeExpanded);
        });
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onToggleDetailPanel',
      function (path, render) {
        _this.dataManager.changeDetailPanelVisibility(path, render);

        _this.setState(_this.dataManager.getRenderState());
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onCellEditStarted',
      function (rowData, columnDef) {
        _this.dataManager.startCellEditable(rowData, columnDef);

        _this.setState(_this.dataManager.getRenderState());
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onCellEditFinished',
      function (rowData, columnDef) {
        _this.dataManager.finishCellEditable(rowData, columnDef);

        _this.setState(_this.dataManager.getRenderState());
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onEditRowDataChanged',
      function (rowData, newData) {
        _this.dataManager.setEditRowData(rowData, newData);

        _this.setState(_this.dataManager.getRenderState());
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'onColumnResized',
      function (id, additionalWidth) {
        _this.dataManager.onColumnResized(id, additionalWidth);

        _this.setState(_this.dataManager.getRenderState());
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'renderTable',
      function (props) {
        return /*#__PURE__*/ _react['default'].createElement(
          _core.Table,
          {
            style: {
              tableLayout:
                props.options.fixedColumns &&
                (props.options.fixedColumns.left ||
                  props.options.fixedColumns.right)
                  ? 'fixed'
                  : props.options.tableLayout
            }
          },
          props.options.header &&
            /*#__PURE__*/ _react['default'].createElement(
              props.components.Header,
              {
                actions: props.actions,
                localization: _objectSpread(
                  _objectSpread(
                    {},
                    MaterialTable.defaultProps.localization.header
                  ),
                  _this.props.localization.header
                ),
                columns: _this.state.columns,
                hasSelection: props.options.selection,
                headerStyle: props.options.headerStyle,
                icons: props.icons,
                selectedCount: _this.state.selectedCount,
                dataCount: props.parentChildData
                  ? _this.state.treefiedDataLength
                  : _this.state.columns.filter(function (col) {
                      return col.tableData.groupOrder > -1;
                    }).length > 0
                  ? _this.state.groupedDataLength
                  : _this.state.data.length,
                hasDetailPanel: !!props.detailPanel,
                detailPanelColumnAlignment:
                  props.options.detailPanelColumnAlignment,
                showActionsColumn:
                  !_this.dataManager.bulkEditOpen &&
                  props.actions &&
                  props.actions.filter(function (a) {
                    return a.position === 'row' || typeof a === 'function';
                  }).length > 0,
                showSelectAllCheckbox: props.options.showSelectAllCheckbox,
                showSelectGroupCheckbox: props.options.showSelectGroupCheckbox,
                orderBy: _this.state.orderBy,
                orderDirection: _this.state.orderDirection,
                onAllSelected: _this.onAllSelected,
                onOrderChange: _this.onChangeOrder,
                actionsHeaderIndex: props.options.actionsColumnIndex,
                sorting: props.options.sorting,
                keepSortDirectionOnColumnSwitch:
                  props.options.keepSortDirectionOnColumnSwitch,
                grouping: props.options.grouping,
                isTreeData: _this.props.parentChildData !== undefined,
                draggable: props.options.draggable,
                thirdSortClick: props.options.thirdSortClick,
                treeDataMaxLevel: _this.state.treeDataMaxLevel,
                options: props.options,
                onColumnResized: _this.onColumnResized,
                scrollWidth: _this.state.width
              }
            ),
          /*#__PURE__*/ _react['default'].createElement(props.components.Body, {
            actions: props.actions,
            components: props.components,
            icons: props.icons,
            renderData: _this.state.renderData,
            data: _this.state.data,
            renderSummaryRow: _this.props.renderSummaryRow,
            currentPage: _this.state.currentPage,
            initialFormData: props.initialFormData,
            pageSize: _this.state.pageSize,
            columns: _this.state.columns,
            errorState: _this.state.errorState,
            detailPanel: props.detailPanel,
            options: props.options,
            getFieldValue: _this.dataManager.getFieldValue,
            isTreeData: _this.props.parentChildData !== undefined,
            onFilterChanged: _this.onFilterChange,
            onRowSelected: _this.onRowSelected,
            onGroupSelected: _this.onGroupSelected,
            onToggleDetailPanel: _this.onToggleDetailPanel,
            onGroupExpandChanged: _this.onGroupExpandChanged,
            onTreeExpandChanged: _this.onTreeExpandChanged,
            onEditingCanceled: _this.onEditingCanceled,
            onEditingApproved: _this.onEditingApproved,
            localization: _objectSpread(
              _objectSpread({}, MaterialTable.defaultProps.localization.body),
              _this.props.localization.body
            ),
            onRowClick: _this.props.onRowClick,
            onRowDoubleClick: _this.props.onRowDoubleClick,
            showAddRow: _this.state.showAddRow,
            hasAnyEditingRow: !!(
              _this.state.lastEditingRow || _this.state.showAddRow
            ),
            hasDetailPanel: !!props.detailPanel,
            treeDataMaxLevel: _this.state.treeDataMaxLevel,
            cellEditable: props.cellEditable,
            onCellEditStarted: _this.onCellEditStarted,
            onCellEditFinished: _this.onCellEditFinished,
            bulkEditOpen: _this.dataManager.bulkEditOpen,
            bulkEditChangedRows: _this.dataManager.bulkEditChangedRows,
            onBulkEditRowChanged: _this.dataManager.onBulkEditRowChanged,
            scrollWidth: _this.state.width
          })
        );
      }
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'getColumnsWidth',
      function (props, count) {
        var result = [];
        var actionsWidth = CommonValues.actionsColumnWidth(props);

        if (actionsWidth > 0) {
          if (
            count > 0 &&
            props.options.actionsColumnIndex >= 0 &&
            props.options.actionsColumnIndex < count
          ) {
            result.push(actionsWidth + 'px');
          } else if (
            count < 0 &&
            props.options.actionsColumnIndex < 0 &&
            props.options.actionsColumnIndex >= count
          ) {
            result.push(actionsWidth + 'px');
          }
        } // add selection action width only for left container div

        if (props.options.selection && count > 0) {
          var selectionWidth = CommonValues.selectionMaxWidth(
            props,
            _this.state.treeDataMaxLevel
          );
          result.push(selectionWidth + 'px');
        }

        for (
          var i = 0;
          i < Math.abs(count) && i < _this.state.columns.length;
          i++
        ) {
          var colDef =
            _this.state.columns[
              count >= 0 ? i : _this.state.columns.length - 1 - i
            ];

          if (colDef.tableData) {
            if (typeof colDef.tableData.width === 'number') {
              result.push(colDef.tableData.width + 'px');
            } else {
              result.push(colDef.tableData.width);
            }
          }
        }

        return 'calc(' + result.join(' + ') + ')';
      }
    );

    var calculatedProps = _this.getProps(_props);

    _this.setDataManagerFields(calculatedProps, true);

    var renderState = _this.dataManager.getRenderState();

    _this.state = _objectSpread(
      _objectSpread(
        {
          data: [],
          errorState: undefined
        },
        renderState
      ),
      {},
      {
        query: {
          filters: renderState.columns
            .filter(function (a) {
              return a.tableData.filterValue;
            })
            .map(function (a) {
              return {
                column: a,
                operator: '=',
                value: a.tableData.filterValue
              };
            }),
          orderBy: renderState.columns.find(function (a) {
            return a.tableData.id === renderState.orderBy;
          }),
          orderDirection: renderState.orderDirection,
          page: 0,
          pageSize: calculatedProps.options.pageSize,
          search: renderState.searchText,
          totalCount: 0
        },
        showAddRow: false,
        bulkEditOpen: false,
        width: 0
      }
    );
    _this.tableContainerDiv = /*#__PURE__*/ _react['default'].createRef();
    return _this;
  }

  (0, _createClass2['default'])(MaterialTable, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        this.setState(
          _objectSpread(
            _objectSpread({}, this.dataManager.getRenderState()),
            {},
            {
              width: this.tableContainerDiv.current.scrollWidth
            }
          ),
          function () {
            if (_this2.isRemoteData()) {
              _this2.onQueryChange(
                _objectSpread(
                  _objectSpread({}, _this2.state.query),
                  {},
                  {
                    page: _this2.props.options.initialPage || 0
                  }
                )
              );
            }
            /**
             * THIS WILL NEED TO BE REMOVED EVENTUALLY.
             * Warn consumer of renamed prop.
             */

            if (_this2.props.onDoubleRowClick !== undefined) {
              console.error(
                'Property `onDoubleRowClick` has been renamed to `onRowDoubleClick`'
              );
            }
          }
        );
      }
    },
    {
      key: 'setDataManagerFields',
      value: function setDataManagerFields(props, isInit, prevColumns) {
        var defaultSortColumnIndex = -1;
        var defaultSortDirection = '';

        if (props && props.options.sorting !== false) {
          defaultSortColumnIndex = props.columns.findIndex(function (a) {
            return a.defaultSort && a.sorting !== false;
          });
          defaultSortDirection =
            defaultSortColumnIndex > -1
              ? props.columns[defaultSortColumnIndex].defaultSort
              : '';
        }

        var columnsCopy = (0, _cloneDeep['default'])(props.columns);

        if (props.options.persistentGroupingsId) {
          var materialTableGroupings = localStorage.getItem(
            'material-table-groupings'
          );

          if (materialTableGroupings) {
            materialTableGroupings = JSON.parse(materialTableGroupings);

            if (materialTableGroupings[props.options.persistentGroupingsId]) {
              materialTableGroupings[
                props.options.persistentGroupingsId
              ].forEach(function (savedGrouping) {
                var column = columnsCopy.find(function (col) {
                  return col.field === savedGrouping.field;
                });

                if (column) {
                  if (!column.tableData) {
                    column.tableData = {};
                  }

                  column.tableData.groupOrder = savedGrouping.groupOrder;
                  column.tableData.groupSort = savedGrouping.groupSort;
                  column.tableData.columnOrder = savedGrouping.columnOrder;
                }
              });
            }
          }
        }

        this.dataManager.setColumns(columnsCopy, prevColumns);
        this.dataManager.setDefaultExpanded(props.options.defaultExpanded); // this.dataManager.changeRowEditing();

        if (this.isRemoteData(props)) {
          this.dataManager.changeApplySearch(false);
          this.dataManager.changeApplyFilters(false);
          this.dataManager.changeApplySort(false);
        } else {
          this.dataManager.changeApplySearch(true);
          this.dataManager.changeApplyFilters(true);
          this.dataManager.changeApplySort(true);
          this.dataManager.setData(props.data);
        } // If the columns changed and the defaultSorting differs from the current sorting, it will trigger a new sorting

        var shouldReorder =
          isInit ||
          (defaultSortColumnIndex !== this.dataManager.orderBy &&
          !this.isRemoteData() &&
          defaultSortDirection // Only if a defaultSortingDirection is passed, it will evaluate for changes
            ? defaultSortDirection !== this.dataManager.orderDirection
            : false);
        shouldReorder &&
          this.dataManager.changeOrder(
            defaultSortColumnIndex,
            defaultSortDirection
          );
        isInit &&
          this.dataManager.changeSearchText(props.options.searchText || '');
        isInit &&
          this.dataManager.changeSearchDebounce(
            props.options.searchDebounceDelay
          );
        isInit &&
          this.dataManager.changeCurrentPage(
            props.options.initialPage ? props.options.initialPage : 0
          );
        isInit && this.dataManager.changePageSize(props.options.pageSize);
        this.dataManager.changePaging(
          this.isRemoteData() ? false : props.options.paging
        );
        isInit && this.dataManager.changeParentFunc(props.parentChildData);
        this.dataManager.changeDetailPanelType(props.options.detailPanelType);
      }
    },
    {
      key: 'cleanProps',
      value: function cleanProps(dirtyProps) {
        return dirtyProps.map(function (prop) {
          var propClone = _objectSpread({}, prop);

          delete propClone.tableData;
          delete propClone.render;
          return propClone;
        });
      }
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        // const propsChanged = Object.entries(this.props).reduce((didChange, prop) => didChange || prop[1] !== prevProps[prop[0]], false);
        var fixedPrevColumns = this.cleanProps(prevProps.columns);
        var fixedPropsColumns = this.cleanProps(this.props.columns);
        var fixedPrevData = this.cleanProps(prevProps.data);
        var fixedPropsData = this.cleanProps(this.props.data);
        var columnPropsChanged = !(0, _react2['default'])(
          fixedPrevColumns,
          fixedPropsColumns
        );
        var propsChanged =
          columnPropsChanged ||
          !(0, _react2['default'])(prevProps.options, this.props.options);

        if (!this.isRemoteData()) {
          propsChanged =
            propsChanged ||
            !(0, _react2['default'])(fixedPrevData, fixedPropsData);
        }

        if (propsChanged) {
          var props = this.getProps(this.props);
          this.setDataManagerFields(props, false, this.props.columns);
          this.setState(this.dataManager.getRenderState());

          if (
            process.env.NODE_ENV === 'development' &&
            columnPropsChanged &&
            !this.checkedForFunctions &&
            prevProps.columns.length !== 0
          ) {
            var bothContainFunctions =
              fixedPropsColumns.some(function (column) {
                return Object.values(column).some(function (val) {
                  return typeof val === 'function';
                });
              }) &&
              fixedPrevColumns.some(function (column) {
                return Object.values(column).some(function (val) {
                  return typeof val === 'function';
                });
              });

            if (bothContainFunctions) {
              this.checkedForFunctions = true;
              var currentColumnsWithoutFunctions = functionlessColumns(
                fixedPropsColumns
              );
              var prevColumnsWithoutFunctions = functionlessColumns(
                fixedPrevColumns
              );
              var columnsEqual = (0, _react2['default'])(
                currentColumnsWithoutFunctions,
                prevColumnsWithoutFunctions
              );

              if (columnsEqual) {
                console.warn(
                  'The columns provided to material table are static, but contain functions which update on every render, resetting the table state. Provide a stable function or column reference or an row id to prevent state loss.'
                );
              }
            }
          }
        }

        var count = this.isRemoteData()
          ? this.state.query.totalCount
          : this.state.data.length;
        var currentPage = this.isRemoteData()
          ? this.state.query.page
          : this.state.currentPage;
        var pageSize = this.isRemoteData()
          ? this.state.query.pageSize
          : this.state.pageSize;

        if (count <= pageSize * currentPage && currentPage !== 0) {
          this.onPageChange(null, Math.max(0, Math.ceil(count / pageSize) - 1));
        }
      }
    },
    {
      key: 'getProps',
      value: function getProps(props, prevColumns) {
        var _this3 = this;

        var calculatedProps = _objectSpread({}, props || this.props);

        calculatedProps.components = _objectSpread(
          _objectSpread({}, MaterialTable.defaultProps.components),
          calculatedProps.components
        );
        calculatedProps.icons = _objectSpread(
          _objectSpread({}, MaterialTable.defaultProps.icons),
          calculatedProps.icons
        );
        calculatedProps.options = _objectSpread(
          _objectSpread({}, MaterialTable.defaultProps.options),
          calculatedProps.options
        );

        var localization = _objectSpread(
          _objectSpread({}, MaterialTable.defaultProps.localization.body),
          calculatedProps.localization.body
        );

        calculatedProps.actions = (0, _toConsumableArray2['default'])(
          calculatedProps.actions || []
        );

        if (calculatedProps.options.selection) {
          calculatedProps.actions = calculatedProps.actions
            .filter(function (a) {
              return a;
            })
            .map(function (action) {
              if (
                action.position === 'auto' ||
                action.isFreeAction === false ||
                (action.position === undefined &&
                  action.isFreeAction === undefined)
              ) {
                if (typeof action === 'function') {
                  return {
                    action: action,
                    position: 'toolbarOnSelect'
                  };
                } else
                  return _objectSpread(
                    _objectSpread({}, action),
                    {},
                    {
                      position: 'toolbarOnSelect'
                    }
                  );
              } else if (action.isFreeAction) {
                if (typeof action === 'function') {
                  return {
                    action: action,
                    position: 'toolbar'
                  };
                } else
                  return _objectSpread(
                    _objectSpread({}, action),
                    {},
                    {
                      position: 'toolbar'
                    }
                  );
              } else return action;
            });
        } else {
          calculatedProps.actions = calculatedProps.actions
            .filter(function (a) {
              return a;
            })
            .map(function (action) {
              if (
                action.position === 'auto' ||
                action.isFreeAction === false ||
                (action.position === undefined &&
                  action.isFreeAction === undefined)
              ) {
                if (typeof action === 'function') {
                  return {
                    action: action,
                    position: 'row'
                  };
                } else
                  return _objectSpread(
                    _objectSpread({}, action),
                    {},
                    {
                      position: 'row'
                    }
                  );
              } else if (action.isFreeAction) {
                if (typeof action === 'function') {
                  return {
                    action: action,
                    position: 'toolbar'
                  };
                } else
                  return _objectSpread(
                    _objectSpread({}, action),
                    {},
                    {
                      position: 'toolbar'
                    }
                  );
              } else return action;
            });
        }

        if (calculatedProps.editable) {
          if (calculatedProps.editable.onRowAdd) {
            calculatedProps.actions.push({
              icon: calculatedProps.icons.Add,
              tooltip: localization.addTooltip,
              position: 'toolbar',
              disabled: !!this.dataManager.lastEditingRow,
              onClick: function onClick() {
                _this3.dataManager.changeRowEditing();

                _this3.setState(
                  _objectSpread(
                    _objectSpread({}, _this3.dataManager.getRenderState()),
                    {},
                    {
                      showAddRow: !_this3.state.showAddRow
                    }
                  )
                );
              }
            });
          }

          if (calculatedProps.editable.onRowUpdate) {
            calculatedProps.actions.push(function (rowData) {
              return {
                icon: calculatedProps.icons.Edit,
                tooltip: calculatedProps.editable.editTooltip
                  ? calculatedProps.editable.editTooltip(rowData)
                  : localization.editTooltip,
                disabled:
                  calculatedProps.editable.isEditable &&
                  !calculatedProps.editable.isEditable(rowData),
                hidden:
                  calculatedProps.editable.isEditHidden &&
                  calculatedProps.editable.isEditHidden(rowData),
                onClick: function onClick(e, rowData) {
                  _this3.dataManager.changeRowEditing(rowData, 'update');

                  _this3.setState(
                    _objectSpread(
                      _objectSpread({}, _this3.dataManager.getRenderState()),
                      {},
                      {
                        showAddRow: false
                      }
                    )
                  );
                }
              };
            });
          }

          if (calculatedProps.editable.onRowDelete) {
            calculatedProps.actions.push(function (rowData) {
              return {
                icon: calculatedProps.icons.Delete,
                tooltip: calculatedProps.editable.deleteTooltip
                  ? calculatedProps.editable.deleteTooltip(rowData)
                  : localization.deleteTooltip,
                disabled:
                  calculatedProps.editable.isDeletable &&
                  !calculatedProps.editable.isDeletable(rowData),
                hidden:
                  calculatedProps.editable.isDeleteHidden &&
                  calculatedProps.editable.isDeleteHidden(rowData),
                onClick: function onClick(e, rowData) {
                  _this3.dataManager.changeRowEditing(rowData, 'delete');

                  _this3.setState(
                    _objectSpread(
                      _objectSpread({}, _this3.dataManager.getRenderState()),
                      {},
                      {
                        showAddRow: false
                      }
                    )
                  );
                }
              };
            });
          }

          if (calculatedProps.editable.onBulkUpdate) {
            calculatedProps.actions.push({
              icon: calculatedProps.icons.Edit,
              tooltip: localization.bulkEditTooltip,
              position: 'toolbar',
              hidden: this.dataManager.bulkEditOpen,
              onClick: function onClick() {
                _this3.dataManager.changeBulkEditOpen(true);

                _this3.props.onBulkEditOpen &&
                  _this3.props.onBulkEditOpen(true);

                _this3.setState(_this3.dataManager.getRenderState());
              }
            });
            calculatedProps.actions.push({
              icon: calculatedProps.icons.Check,
              tooltip: localization.bulkEditApprove,
              position: 'toolbar',
              hidden: !this.dataManager.bulkEditOpen,
              onClick: function onClick() {
                return _this3.onEditingApproved('bulk');
              }
            });
            calculatedProps.actions.push({
              icon: calculatedProps.icons.Clear,
              tooltip: localization.bulkEditCancel,
              position: 'toolbar',
              hidden: !this.dataManager.bulkEditOpen,
              onClick: function onClick() {
                _this3.dataManager.changeBulkEditOpen(false);

                _this3.props.onBulkEditOpen &&
                  _this3.props.onBulkEditOpen(false);

                _this3.dataManager.clearBulkEditChangedRows();

                _this3.setState(_this3.dataManager.getRenderState());
              }
            });
          }
        }

        return calculatedProps;
      }
    },
    {
      key: 'renderFooter',
      value: function renderFooter() {
        var props = this.getProps();

        if (props.options.paging) {
          var localization = _objectSpread(
            _objectSpread(
              {},
              MaterialTable.defaultProps.localization.pagination
            ),
            this.props.localization.pagination
          );

          var isOutsidePageNumbers = this.isOutsidePageNumbers(props);
          var currentPage = isOutsidePageNumbers
            ? Math.min(
                props.page,
                Math.floor(props.totalCount / this.state.pageSize)
              )
            : this.state.currentPage;
          var totalCount = isOutsidePageNumbers
            ? props.totalCount
            : this.state.data.length;
          return /*#__PURE__*/ _react['default'].createElement(
            _core.Table,
            null,
            /*#__PURE__*/ _react['default'].createElement(
              _core.TableFooter,
              {
                style: {
                  display: 'grid'
                }
              },
              /*#__PURE__*/ _react['default'].createElement(
                _core.TableRow,
                null,
                /*#__PURE__*/ _react['default'].createElement(
                  props.components.Pagination,
                  {
                    classes: {
                      root: props.classes.paginationRoot,
                      toolbar: props.classes.paginationToolbar,
                      caption: props.classes.paginationCaption,
                      selectRoot: props.classes.paginationSelectRoot
                    },
                    style: {
                      float: props.theme.direction === 'rtl' ? '' : 'right',
                      overflowX: 'auto'
                    },
                    colSpan: 3,
                    count: this.isRemoteData()
                      ? this.state.query.totalCount
                      : totalCount,
                    icons: props.icons,
                    rowsPerPage: this.state.pageSize,
                    rowsPerPageOptions: props.options.pageSizeOptions,
                    SelectProps: {
                      renderValue: function renderValue(value) {
                        return /*#__PURE__*/ _react['default'].createElement(
                          'div',
                          {
                            style: {
                              padding: '0px 5px'
                            }
                          },
                          value + ' ' + localization.labelRowsSelect + ' '
                        );
                      }
                    },
                    page: this.isRemoteData()
                      ? this.state.query.page
                      : currentPage,
                    onPageChange: this.onPageChange,
                    onRowsPerPageChange: this.onRowsPerPageChange,
                    ActionsComponent: function ActionsComponent(subProps) {
                      return props.options.paginationType === 'normal'
                        ? /*#__PURE__*/ _react['default'].createElement(
                            _components.MTablePagination,
                            (0, _extends2['default'])({}, subProps, {
                              icons: props.icons,
                              localization: localization,
                              showFirstLastPageButtons:
                                props.options.showFirstLastPageButtons
                            })
                          )
                        : /*#__PURE__*/ _react['default'].createElement(
                            _components.MTableSteppedPagination,
                            (0, _extends2['default'])({}, subProps, {
                              icons: props.icons,
                              localization: localization,
                              showFirstLastPageButtons:
                                props.options.showFirstLastPageButtons
                            })
                          );
                    },
                    labelDisplayedRows: function labelDisplayedRows(row) {
                      return localization.labelDisplayedRows
                        .replace('{from}', row.from)
                        .replace('{to}', row.to)
                        .replace('{count}', row.count);
                    },
                    labelRowsPerPage: localization.labelRowsPerPage
                  }
                )
              )
            )
          );
        }
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this4 = this;

        var props = this.getProps();
        return /*#__PURE__*/ _react['default'].createElement(
          _reactBeautifulDnd.DragDropContext,
          {
            onDragEnd: this.onDragEnd,
            nonce: props.options.cspNonce
          },
          /*#__PURE__*/ _react['default'].createElement(
            props.components.Container,
            {
              style: _objectSpread(
                {
                  position: 'relative'
                },
                props.style
              )
            },
            props.options.paginationPosition === 'top' ||
              props.options.paginationPosition === 'both'
              ? this.renderFooter()
              : null,
            props.options.toolbar &&
              /*#__PURE__*/ _react['default'].createElement(
                props.components.Toolbar,
                {
                  actions: props.actions,
                  components: props.components,
                  selectedRows:
                    this.state.selectedCount > 0
                      ? this.state.originalData.filter(function (a) {
                          return a.tableData.checked;
                        })
                      : [],
                  columns: this.state.columns,
                  columnsButton: props.options.columnsButton,
                  icons: props.icons,
                  exportAllData: props.options.exportAllData,
                  exportMenu: props.options.exportMenu,
                  getFieldValue: this.dataManager.getFieldValue,
                  data: this.state.data,
                  renderData: this.state.renderData,
                  search: props.options.search,
                  showTitle: props.options.showTitle,
                  showTextRowsSelected: props.options.showTextRowsSelected,
                  toolbarButtonAlignment: props.options.toolbarButtonAlignment,
                  searchFieldAlignment: props.options.searchFieldAlignment,
                  searchAutoFocus: props.options.searchAutoFocus,
                  searchFieldStyle: props.options.searchFieldStyle,
                  searchFieldVariant: props.options.searchFieldVariant,
                  title: props.title,
                  searchText: this.dataManager.searchText,
                  searchDebounceDelay: this.dataManager.searchDebounceDelay,
                  onSearchChanged: this.onSearchChangeDebounce,
                  isRemoteData: this.isRemoteData(),
                  dataManager: this.dataManager,
                  onColumnsChanged: this.onChangeColumnHidden,
                  localization: _objectSpread(
                    _objectSpread(
                      {},
                      MaterialTable.defaultProps.localization.toolbar
                    ),
                    this.props.localization.toolbar
                  )
                }
              ),
            props.options.grouping &&
              /*#__PURE__*/ _react['default'].createElement(
                props.components.Groupbar,
                {
                  icons: props.icons,
                  localization: _objectSpread(
                    _objectSpread(
                      {},
                      MaterialTable.defaultProps.localization.grouping
                    ),
                    props.localization.grouping
                  ),
                  groupColumns: this.state.columns
                    .filter(function (col) {
                      return col.tableData.groupOrder > -1;
                    })
                    .sort(function (col1, col2) {
                      return (
                        col1.tableData.groupOrder - col2.tableData.groupOrder
                      );
                    }),
                  onSortChanged: this.onChangeGroupOrder,
                  onGroupRemoved: this.onGroupRemoved,
                  persistentGroupingsId: props.options.persistentGroupingsId
                }
              ),
            /*#__PURE__*/ _react['default'].createElement(
              _components.MTableScrollbar,
              {
                double: props.options.doubleHorizontalScroll
              },
              /*#__PURE__*/ _react['default'].createElement(
                _reactBeautifulDnd.Droppable,
                {
                  droppableId: 'headers',
                  direction: 'horizontal'
                },
                function (provided, snapshot) {
                  var table = _this4.renderTable(props);

                  return /*#__PURE__*/ _react['default'].createElement(
                    'div',
                    {
                      ref: provided.innerRef
                    },
                    /*#__PURE__*/ _react['default'].createElement(
                      'div',
                      {
                        ref: _this4.tableContainerDiv,
                        style: {
                          maxHeight: props.options.maxBodyHeight,
                          minHeight: props.options.minBodyHeight,
                          overflowY: props.options.overflowY
                        }
                      },
                      _this4.state.width &&
                        props.options.fixedColumns &&
                        props.options.fixedColumns.right
                        ? /*#__PURE__*/ _react['default'].createElement(
                            'div',
                            {
                              style: {
                                width: _this4.getColumnsWidth(
                                  props,
                                  -1 * props.options.fixedColumns.right
                                ),
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                boxShadow:
                                  '-2px 0px 15px rgba(125,147,178,.25)',
                                overflowX: 'clip',
                                zIndex: 11
                              }
                            },
                            /*#__PURE__*/ _react['default'].createElement(
                              'div',
                              {
                                style: {
                                  width: _this4.state.width,
                                  background: 'white',
                                  transform: 'translateX(calc('.concat(
                                    _this4.getColumnsWidth(
                                      props,
                                      -1 * props.options.fixedColumns.right
                                    ),
                                    ' - 100%))'
                                  )
                                }
                              },
                              table
                            )
                          )
                        : null,
                      /*#__PURE__*/ _react['default'].createElement(
                        'div',
                        null,
                        table
                      ),
                      _this4.state.width &&
                        props.options.fixedColumns &&
                        props.options.fixedColumns.left
                        ? /*#__PURE__*/ _react['default'].createElement(
                            'div',
                            {
                              style: {
                                width: _this4.getColumnsWidth(
                                  props,
                                  props.options.fixedColumns.left
                                ),
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                boxShadow: '2px 0px 15px rgba(125,147,178,.25)',
                                overflowX: 'hidden',
                                zIndex: 11
                              }
                            },
                            /*#__PURE__*/ _react['default'].createElement(
                              'div',
                              {
                                style: {
                                  width: _this4.state.width,
                                  background: 'white'
                                },
                                onKeyDown: function onKeyDown(e) {
                                  if (e.key === 'Tab') {
                                    e.preventDefault();
                                  }
                                }
                              },
                              table
                            )
                          )
                        : null
                    ),
                    provided.placeholder
                  );
                }
              )
            ),
            (this.state.isLoading || props.isLoading) &&
              props.options.loadingType === 'linear' &&
              /*#__PURE__*/ _react['default'].createElement(
                'div',
                {
                  style: {
                    position: 'relative',
                    width: '100%'
                  }
                },
                /*#__PURE__*/ _react['default'].createElement(
                  'div',
                  {
                    style: {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '100%'
                    }
                  },
                  /*#__PURE__*/ _react['default'].createElement(
                    _core.LinearProgress,
                    null
                  )
                )
              ),
            props.options.paginationPosition === 'bottom' ||
              props.options.paginationPosition === 'both'
              ? this.renderFooter()
              : null,
            (this.state.isLoading || props.isLoading) &&
              props.options.loadingType === 'overlay' &&
              /*#__PURE__*/ _react['default'].createElement(
                'div',
                {
                  style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 11
                  }
                },
                /*#__PURE__*/ _react['default'].createElement(
                  props.components.OverlayLoading,
                  {
                    theme: props.theme
                  }
                )
              ),
            this.state.errorState &&
              this.state.errorState.errorCause === 'query' &&
              /*#__PURE__*/ _react['default'].createElement(
                'div',
                {
                  style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 11
                  }
                },
                /*#__PURE__*/ _react['default'].createElement(
                  props.components.OverlayError,
                  {
                    error: this.state.errorState,
                    retry: this.retry,
                    theme: props.theme,
                    icon: props.icons.Retry
                  }
                )
              )
          )
        );
      }
    }
  ]);
  return MaterialTable;
})(_react['default'].Component);

exports['default'] = MaterialTable;

function functionlessColumns(columns) {
  return columns.map(function (col) {
    return Object.entries(col).reduce(function (obj, _ref) {
      var _ref2 = (0, _slicedToArray2['default'])(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

      if (typeof val !== 'function') {
        obj[key] = val;
      }

      return obj;
    }, {});
  });
}
