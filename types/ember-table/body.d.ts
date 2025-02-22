import Component from '@ember/component';

import { WithBoundArgs } from '@glint/template';

import EmberTableCell from './cell';
import EmberTableRow from './row';
import { Column, ColumnMeta, RowValue, SelectionMode, TableApi, TableMeta } from './table';

/**
 * T - Table rows
 * TM - Table Meta
 *
 * @export
 * @interface TBodyArgs
 * @template T
 * @template TM
 */
export interface TBodyArgs<
    RV extends RowValue,
    CV extends Column<RV, M, CM, RM, TM>,
    M,
    CM extends ColumnMeta,
    RM,
    TM
> {
    api: TableApi<CV, RV, M, CM, RM, TM>;
    /**
     * The number of extra rows to render on either side of the table's viewport
     *
     * @type {number}
     * @memberof TBodyArgs
     */
    bufferSize?: number;

    /**
     * Sets which row selection behavior to follow. Possible values are 'none' (clicking on a row does nothing),
     * 'single' (clicking on a row selects it and deselects other rows), and 'multiple' (multiple rows can be selected through ctrl/cmd-click or shift-click).
     *
     * @type {SelectionMode}
     * @memberof TBodyArgs
     */
    checkboxSelectionMode?: SelectionMode;

    /**
     * A selector string that will select the element from which to calculate the viewable height.
     * Set to null for fixed height tables
     *
     * @type {string}
     * @memberof TBodyArgs
     */
    containerSelector?: string;

    /**
     * Boolean flag that enables collapsing tree nodes
     *
     * @type {boolean}
     * @memberof TBodyArgs
     */
    enableCollapse?: boolean;

    /**
     * Boolean flag that enables tree behavior if items have a `children` property
     *
     * @type {boolean}
     * @memberof TBodyArgs
     */
    enableTree?: boolean;

    /**
     * Estimated height for each row. This number is used to decide how many rows will be rendered at initial rendering.
     *
     * @type {number}
     * @memberof TBodyArgs
     */
    estimateRowHeight?: number;

    /**
     * Invokes an action when the first row in the table is reached/in view
     *
     * @memberof TBodyArgs
     */
    firstReached?: () => void;

    /**
     * An action that is triggered when the first visible row of the table changes.
     *
     * @memberof TBodyArgs
     */
    firstVisibleChanged?: () => void;

    /**
     * The property is passed through to the vertical-collection. If set,
     * upon initialization the scroll position will be set such that the item with the provided id is at the top left on screen.
     * If the item with id cannot be found, scrollTop is set to 0.
     *
     * @type {string}
     * @memberof TBodyArgs
     */
    idForFirstItem?: string;

    /**
     * This key is the property used by the collection to determine whether an array mutation is an append, prepend, or complete replacement.
     * It is also the key that is passed to the actions, and can be used to restore scroll position with idForFirstItem. This is passed through to the vertical-collection.
     *
     * @type {string}
     * @memberof TBodyArgs
     */
    key?: string;

    /**
     * Invokes an action when the last row in the table is reached/in view
     *
     * @memberof TBodyArgs
     */
    lastReached?: () => void;

    /**
     * An action that is triggered when the last visible row of the table changes.
     *
     * @memberof TBodyArgs
     */
    lastVisibleChanged?: () => void;

    /**
     * An action that is called when the row selection of the table changes. Will be called with either an array or individual row, depending on the checkboxSelectionMode.
     *
     * @memberof TBodyArgs
     */
    onSelect?: () => void;

    /**
     * A flag that tells the table to render all of its rows at once.
     *
     * @type {boolean}
     * @memberof TBodyArgs
     */
    renderAll?: boolean;

    /**
     * The component to use to render the row
     *
     * @type {string}
     * @memberof TBodyArgs
     */
    rowComponent?: string;

    /**
     * The row items that the table should display
     *
     * @type {T[]}
     * @memberof TBodyArgs
     */
    rows: RV[];

    /**
     * Sets which checkbox selection behavior to follow. Possible values are 'none' (clicking on a row does nothing),
     * 'single' (clicking on a row selects it and deselects other rows), and 'multiple' (multiple rows can be selected through ctrl/cmd-click or shift-click).
     *
     * @type {SelectionMode}
     * @memberof TBodyArgs
     */
    rowSelectionMode?: SelectionMode;

    /**
     * When true, this option causes selecting all of a node's children to also select the node itself.
     *
     * @type {boolean}
     * @memberof TBodyArgs
     */
    selectingChildrenSelectsParents?: boolean;

    /**
     * The currently selected rows. Can either be an array or an individual row.
     *
     * @type {(T[] | T | null)}
     * @memberof TBodyArgs
     */
    selection?: RV[] | RV | null;

    /**
     * A function that will override how selection is compared to row value.
     *
     * @memberof TBodyArgs
     */
    selectionMatchFunction?: () => void;

    /**
     * A flag that controls if all rows have same static height or not.
     * By default it is set to false and row height is dependent on its internal content.
     * If it is set to true, all rows have the same height equivalent to estimateRowHeight.
     *
     * @type {boolean}
     * @memberof TBodyArgs
     */
    staticHeight?: boolean;

    /**
     * Table meta object - this is used to pass actions and data to any part of the table from outside
     *
     * @type {TableMeta}
     * @memberof TBodyArgs
     */
    tableMeta?: TableMeta<TM>;
}
export interface EmberTableBodySignature<
    CV extends Column<RV, M, CM, RM, TM>,
    RV extends RowValue,
    M,
    CM extends ColumnMeta,
    RM,
    TM
> {
    Args: TBodyArgs<RV, CV, M, CM, RM, TM>;
    Blocks: {
        default: [
            {
                rowValue: RV;
                rowMeta: RM;
                cells: EmberTableCell<CV, RV, M, CM, RM, TM>[];
                rowSelectionMode: SelectionMode;
                rowToggleMode: boolean;
                rowsCount: number;
                row: WithBoundArgs<typeof EmberTableRow, 'api'>;
            }
        ];
    };

    Element: HTMLDivElement;
}

type Args<
    CV extends Column<RV, M, CM, RM, TM>,
    RV extends RowValue,
    M,
    CM extends ColumnMeta,
    RM,
    TM
> = EmberTableBodySignature<CV, RV, M, CM, RM, TM>['Args'];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default interface EmberTableBody<
    CV extends Column<RV, M, CM, RM, TM>,
    RV extends RowValue,
    M,
    CM extends ColumnMeta,
    RM,
    TM
    // T extends EmberTableBodySignature<CV, RV, M, CM, RM, TM>
> extends Args<CV, RV, M, CM, RM, TM> {}

// eslint-disable-next-line ember/require-tagless-components
export default class EmberTableBody<
    CV extends Column<RV, M, CM, RM, TM>,
    RV extends RowValue,
    M,
    CM extends ColumnMeta,
    RM,
    TM
    // T extends EmberTableBodySignature<CV, RV, M, CM, RM, TM>
    // eslint-disable-next-line ember/require-tagless-components
> extends Component<EmberTableBodySignature<CV, RV, M, CM, RM, TM>> {}
