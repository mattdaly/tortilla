import React from 'react';

type TableColumnProps = {
    accessor: string;
    className?: string;
    renderer?: (value: any) => JSX.Element;
    title: string | JSX.Element;
    sticky?: boolean;
    width?: 'auto' | 'min-content' | 'max-content';
};

const Column = (props: TableColumnProps) => {
    return null;
};

type TableProps = {
    children: any[];
    data: object[];
};

export type ForwardedTableWithStatics = React.ForwardRefExoticComponent<TableProps> & {
    Column: React.FunctionComponent<TableColumnProps>;
};

const Table = React.forwardRef<HTMLDivElement, TableProps>(function Table(externalProps, externalRef) {
    let { children, data, ...props } = externalProps;
    let columns = React.Children.toArray(children).map((child) => child.props);

    return (
        <div className="overflow-auto relative" style={{ height: '400px', width: '1200px' }}>
            <div
                {...props}
                className="grid"
                style={{
                    gridTemplateColumns: columns.reduce((accum, column) => `${accum} ${column.width ?? 'max-content'}`, ''),
                }}
                ref={externalRef}
                role="table"
            >
                <div role="rowgroup" className="contents">
                    <div role="row" className="contents">
                        {columns.map((column, j) => (
                            <span
                                role="columnheader"
                                className={`bg-white border border-b-4 border-b-gray-300 overflow-hidden font-bold p-2 sticky top-0 z-10 ${
                                    column.className ?? ''
                                } ${column.sticky ? 'z-20 left-0 border-r-4 border-r-gray-300' : ''}`}
                                key={j}
                            >
                                {column.title}
                            </span>
                        ))}
                    </div>
                </div>
                <div role="rowgroup" className="contents">
                    {data.map((item, i) => (
                        <div role="row" className="contents" key={i}>
                            {columns.map((column, j) => (
                                <span
                                    role="cell"
                                    className={`bg-white border overflow-hidden p-2 ${column.className ?? ''} ${
                                        column.sticky ? 'z-10 sticky left-0 border-r-4 border-r-gray-300' : ''
                                    }`}
                                    key={j}
                                >
                                    {column.renderer ? column.renderer(item[column.accessor]) : item[column.accessor]}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}) as ForwardedTableWithStatics;

Table.Column = Column;

export { Table, TableProps };
