'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MTableToolbar = MTableToolbar;
exports['default'] = exports.styles = void 0;

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
);

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);

var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
);

var _Checkbox = _interopRequireDefault(require('@material-ui/core/Checkbox'));

var _InputAdornment = _interopRequireDefault(
  require('@material-ui/core/InputAdornment')
);

var _IconButton = _interopRequireDefault(
  require('@material-ui/core/IconButton')
);

var _Menu = _interopRequireDefault(require('@material-ui/core/Menu'));

var _MenuItem = _interopRequireDefault(require('@material-ui/core/MenuItem'));

var _TextField = _interopRequireDefault(require('@material-ui/core/TextField'));

var _Toolbar = _interopRequireDefault(require('@material-ui/core/Toolbar'));

var _Tooltip = _interopRequireDefault(require('@material-ui/core/Tooltip'));

var _Typography = _interopRequireDefault(
  require('@material-ui/core/Typography')
);

var _core = require('@material-ui/core');

var _classnames = _interopRequireDefault(require('classnames'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _react = _interopRequireDefault(require('react'));

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

var searchTimer;

function MTableToolbar(props) {
  var _React$useState = _react['default'].useState(function () {
      return {
        columnsButtonAnchorEl: null,
        exportButtonAnchorEl: null,
        searchText: props.searchText
      };
    }),
    _React$useState2 = (0, _slicedToArray2['default'])(_React$useState, 2),
    state = _React$useState2[0],
    setState = _React$useState2[1];

  var onSearchChange = function onSearchChange(searchText) {
    setState(
      _objectSpread(
        _objectSpread({}, state),
        {},
        {
          searchText: searchText
        }
      )
    );
    props.dataManager.changeSearchText(searchText);

    if (!props.isRemoteData) {
      props.onSearchChanged(searchText);
      return;
    }

    if (searchTimer) {
      clearTimeout(searchTimer);
    }

    searchTimer = setTimeout(function () {
      props.onSearchChanged(searchText);
      searchTimer = null;
    }, props.searchDebounceDelay);
  };

  var getTableData = function getTableData() {
    var columns = props.columns
      .filter(function (columnDef) {
        return (
          (!columnDef.hidden || columnDef['export'] === true) &&
          columnDef.field &&
          columnDef['export'] !== false
        );
      })
      .sort(function (a, b) {
        return a.tableData.columnOrder > b.tableData.columnOrder ? 1 : -1;
      });
    var data = (props.exportAllData ? props.data : props.renderData).map(
      function (rowData) {
        return columns.map(function (columnDef) {
          /*
        About: column.customExport
        This bit of code checks if prop customExport in column is a function, and if it is then it
        uses that function to transform the data, this is useful in cases where a column contains
        complex objects or array and it needs to be handled before it's passed to the exporter 
        to avoid [object Object] output (e.g. to flatten data). 
        Please note that it is also possible to transform data within under exportMenu 
        using a custom function (exportMenu.exportFunc) for each exporter.
        */
          if (typeof columnDef.customExport === 'function') {
            return columnDef.customExport(rowData);
          }

          return props.getFieldValue(rowData, columnDef);
        });
      }
    );
    return [columns, data];
  };

  function renderSearch() {
    var localization = _objectSpread(
      _objectSpread({}, MTableToolbar.defaultProps.localization),
      props.localization
    );

    if (props.search) {
      return /*#__PURE__*/ _react['default'].createElement(
        _TextField['default'],
        {
          autoFocus: props.searchAutoFocus,
          className:
            props.searchFieldAlignment === 'left' && props.showTitle === false
              ? null
              : props.classes.searchField,
          value: state.searchText,
          onChange: function onChange(event) {
            return onSearchChange(event.target.value);
          },
          placeholder: localization.searchPlaceholder,
          variant: props.searchFieldVariant,
          InputProps: {
            startAdornment: /*#__PURE__*/ _react['default'].createElement(
              _InputAdornment['default'],
              {
                position: 'start'
              },
              /*#__PURE__*/ _react['default'].createElement(
                _Tooltip['default'],
                {
                  title: localization.searchTooltip
                },
                /*#__PURE__*/ _react['default'].createElement(
                  props.icons.Search,
                  {
                    fontSize: 'small'
                  }
                )
              )
            ),
            endAdornment: /*#__PURE__*/ _react['default'].createElement(
              _InputAdornment['default'],
              {
                position: 'end'
              },
              /*#__PURE__*/ _react['default'].createElement(
                _IconButton['default'],
                {
                  disabled: !state.searchText,
                  onClick: function onClick() {
                    return onSearchChange('');
                  },
                  'aria-label': localization.clearSearchAriaLabel
                },
                /*#__PURE__*/ _react['default'].createElement(
                  props.icons.ResetSearch,
                  {
                    fontSize: 'small',
                    'aria-label': 'clear'
                  }
                )
              )
            ),
            style: props.searchFieldStyle,
            inputProps: {
              'aria-label': localization.searchAriaLabel
            }
          }
        }
      );
    } else {
      return null;
    }
  }

  function renderDefaultActions() {
    var localization = _objectSpread(
      _objectSpread({}, MTableToolbar.defaultProps.localization),
      props.localization
    );

    var classes = props.classes;
    return /*#__PURE__*/ _react['default'].createElement(
      'div',
      {
        style: {
          display: 'flex'
        }
      },
      props.columnsButton &&
        /*#__PURE__*/ _react['default'].createElement(
          'span',
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _Tooltip['default'],
            {
              title: localization.showColumnsTitle
            },
            /*#__PURE__*/ _react['default'].createElement(
              _IconButton['default'],
              {
                color: 'inherit',
                onClick: function onClick(event) {
                  return setState(
                    _objectSpread(
                      _objectSpread({}, state),
                      {},
                      {
                        columnsButtonAnchorEl: event.currentTarget
                      }
                    )
                  );
                },
                'aria-label': localization.showColumnsAriaLabel
              },
              /*#__PURE__*/ _react['default'].createElement(
                props.icons.ViewColumn,
                null
              )
            )
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _Menu['default'],
            {
              anchorEl: state.columnsButtonAnchorEl,
              open: Boolean(state.columnsButtonAnchorEl),
              onClose: function onClose() {
                return setState(
                  _objectSpread(
                    _objectSpread({}, state),
                    {},
                    {
                      columnsButtonAnchorEl: null
                    }
                  )
                );
              }
            },
            /*#__PURE__*/ _react['default'].createElement(
              _MenuItem['default'],
              {
                key: 'text',
                disabled: true,
                style: {
                  opacity: 1,
                  fontWeight: 600,
                  fontSize: 12
                }
              },
              localization.addRemoveColumns
            ),
            props.columns.map(function (col) {
              var hiddenFromColumnsButtonMenu =
                col.hiddenByColumnsButton !== undefined
                  ? col.hiddenByColumnsButton
                  : props.columnsHiddenInColumnsButton;

              if (hiddenFromColumnsButtonMenu) {
                return null;
              }

              return /*#__PURE__*/ _react['default'].createElement(
                'li',
                {
                  key: col.tableData.id
                },
                /*#__PURE__*/ _react['default'].createElement(
                  _MenuItem['default'],
                  {
                    className: classes.formControlLabel,
                    component: 'label',
                    htmlFor: 'column-toggle-'.concat(col.tableData.id),
                    disabled: col.removable === false
                  },
                  /*#__PURE__*/ _react['default'].createElement(
                    _Checkbox['default'],
                    {
                      checked: !col.hidden,
                      id: 'column-toggle-'.concat(col.tableData.id),
                      onChange: function onChange() {
                        return props.onColumnsChanged(col, !col.hidden);
                      }
                    }
                  ),
                  /*#__PURE__*/ _react['default'].createElement(
                    'span',
                    null,
                    col.title
                  )
                )
              );
            })
          )
        ),
      props.exportMenu.length > 0 &&
        /*#__PURE__*/ _react['default'].createElement(
          'span',
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _Tooltip['default'],
            {
              title: localization.exportTitle
            },
            /*#__PURE__*/ _react['default'].createElement(
              _IconButton['default'],
              {
                color: 'inherit',
                onClick: function onClick(event) {
                  return setState(
                    _objectSpread(
                      _objectSpread({}, state),
                      {},
                      {
                        exportButtonAnchorEl: event.currentTarget
                      }
                    )
                  );
                },
                'aria-label': localization.exportAriaLabel
              },
              /*#__PURE__*/ _react['default'].createElement(
                props.icons.Export,
                null
              )
            )
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _Menu['default'],
            {
              anchorEl: state.exportButtonAnchorEl,
              open: Boolean(state.exportButtonAnchorEl),
              onClose: function onClose() {
                return setState(
                  _objectSpread(
                    _objectSpread({}, state),
                    {},
                    {
                      exportButtonAnchorEl: null
                    }
                  )
                );
              }
            },
            props.exportMenu.map(function (menuitem, index) {
              var _getTableData = getTableData(),
                _getTableData2 = (0, _slicedToArray2['default'])(
                  _getTableData,
                  2
                ),
                cols = _getTableData2[0],
                datas = _getTableData2[1];

              return /*#__PURE__*/ _react['default'].createElement(
                _MenuItem['default'],
                {
                  key: ''.concat(menuitem.label).concat(index),
                  onClick: function onClick() {
                    menuitem.exportFunc(cols, datas);
                    setState({
                      exportButtonAnchorEl: null
                    });
                  }
                },
                menuitem.label
              );
            })
          )
        ),
      /*#__PURE__*/ _react['default'].createElement(
        'span',
        null,
        /*#__PURE__*/ _react['default'].createElement(
          props.components.Actions,
          {
            actions:
              props.actions &&
              props.actions.filter(function (a) {
                return a.position === 'toolbar';
              }),
            components: props.components
          }
        )
      )
    );
  }

  function renderSelectedActions() {
    return /*#__PURE__*/ _react['default'].createElement(
      _react['default'].Fragment,
      null,
      /*#__PURE__*/ _react['default'].createElement(props.components.Actions, {
        actions: props.actions.filter(function (a) {
          return a.position === 'toolbarOnSelect';
        }),
        data: props.selectedRows,
        components: props.components
      })
    );
  }

  function renderActions() {
    var classes = props.classes;
    return /*#__PURE__*/ _react['default'].createElement(
      'div',
      {
        className: classes.actions
      },
      /*#__PURE__*/ _react['default'].createElement(
        'div',
        null,
        props.selectedRows && props.selectedRows.length > 0
          ? renderSelectedActions()
          : renderDefaultActions()
      )
    );
  }

  function renderToolbarTitle(title) {
    var classes = props.classes;
    var toolBarTitle = // eslint-disable-next-line multiline-ternary
      typeof title === 'string'
        ? /*#__PURE__*/ _react['default'].createElement(
            _Typography['default'],
            {
              variant: 'h6',
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }
            },
            title
          )
        : title;
    return /*#__PURE__*/ _react['default'].createElement(
      'div',
      {
        className: classes.title
      },
      toolBarTitle
    );
  }

  function render() {
    var classes = props.classes;

    var localization = _objectSpread(
      _objectSpread({}, MTableToolbar.defaultProps.localization),
      props.localization
    );

    var title =
      props.showTextRowsSelected &&
      props.selectedRows &&
      props.selectedRows.length > 0
        ? typeof localization.nRowsSelected === 'function'
          ? localization.nRowsSelected(props.selectedRows.length)
          : localization.nRowsSelected.replace('{0}', props.selectedRows.length)
        : props.showTitle
        ? props.title
        : null;
    return /*#__PURE__*/ _react['default'].createElement(
      _Toolbar['default'],
      {
        ref: props.forwardedRef,
        className: (0, _classnames['default'])(
          classes.root,
          (0, _defineProperty2['default'])(
            {},
            classes.highlight,
            props.showTextRowsSelected &&
              props.selectedRows &&
              props.selectedRows.length > 0
          )
        )
      },
      title && renderToolbarTitle(title),
      props.searchFieldAlignment === 'left' && renderSearch(),
      props.toolbarButtonAlignment === 'left' && renderActions(),
      /*#__PURE__*/ _react['default'].createElement('div', {
        className: classes.spacer
      }),
      props.searchFieldAlignment === 'right' && renderSearch(),
      props.toolbarButtonAlignment === 'right' && renderActions()
    );
  }

  return render();
}

MTableToolbar.defaultProps = {
  actions: [],
  columns: [],
  columnsHiddenInColumnsButton: false,
  // By default, all columns are shown in the Columns Button (columns action when `options.columnsButton = true`)
  columnsButton: false,
  localization: {
    addRemoveColumns: 'Add or remove columns',
    nRowsSelected: '{0} row(s) selected',
    showColumnsTitle: 'Show Columns',
    showColumnsAriaLabel: 'Show Columns',
    exportTitle: 'Export',
    exportAriaLabel: 'Export',
    searchTooltip: 'Search',
    searchPlaceholder: 'Search',
    searchAriaLabel: 'Search',
    clearSearchAriaLabel: 'Clear Search'
  },
  search: true,
  showTitle: true,
  searchText: '',
  showTextRowsSelected: true,
  toolbarButtonAlignment: 'right',
  searchAutoFocus: false,
  searchFieldAlignment: 'right',
  searchFieldVariant: 'standard',
  selectedRows: [],
  title: 'No Title!'
};
MTableToolbar.propTypes = {
  actions: _propTypes['default'].array,
  columns: _propTypes['default'].array,
  columnsButton: _propTypes['default'].bool,
  components: _propTypes['default'].object.isRequired,
  getFieldValue: _propTypes['default'].func.isRequired,
  localization: _propTypes['default'].object.isRequired,
  onColumnsChanged: _propTypes['default'].func.isRequired,
  dataManager: _propTypes['default'].object.isRequired,
  searchText: _propTypes['default'].string,
  onSearchChanged: _propTypes['default'].func.isRequired,
  search: _propTypes['default'].bool.isRequired,
  searchFieldStyle: _propTypes['default'].object,
  searchFieldVariant: _propTypes['default'].string,
  selectedRows: _propTypes['default'].array,
  title: _propTypes['default'].oneOfType([
    _propTypes['default'].element,
    _propTypes['default'].string
  ]),
  showTitle: _propTypes['default'].bool.isRequired,
  showTextRowsSelected: _propTypes['default'].bool.isRequired,
  toolbarButtonAlignment: _propTypes['default'].string.isRequired,
  searchFieldAlignment: _propTypes['default'].string.isRequired,
  renderData: _propTypes['default'].array,
  data: _propTypes['default'].array,
  exportAllData: _propTypes['default'].bool,
  exportMenu: _propTypes['default'].arrayOf(
    _propTypes['default'].shape({
      name: _propTypes['default'].string,
      handler: _propTypes['default'].func
    })
  ),
  classes: _propTypes['default'].object,
  searchAutoFocus: _propTypes['default'].bool
};

var styles = function styles(theme) {
  return {
    root: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(2)
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: (0, _core.lighten)(
              theme.palette.secondary.light,
              0.85
            )
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    spacer: {
      flex: '1 1 10%'
    },
    actions: {
      color: theme.palette.text.secondary
    },
    title: {
      overflow: 'hidden'
    },
    searchField: {
      minWidth: 150,
      paddingLeft: theme.spacing(2)
    },
    formControlLabel: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  };
};

exports.styles = styles;

var MTableToolbarRef = /*#__PURE__*/ _react['default'].forwardRef(
  function MTableToolbarRef(props, ref) {
    return /*#__PURE__*/ _react['default'].createElement(
      MTableToolbar,
      (0, _extends2['default'])({}, props, {
        forwardedRef: ref
      })
    );
  }
);

var _default = (0, _core.withStyles)(styles)(MTableToolbarRef);

exports['default'] = _default;
