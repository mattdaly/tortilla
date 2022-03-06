import React from 'react';

type TableColumnProps = {
    accessor: string;
    renderer: (value: any) => JSX.Element;
    title: JSX.Element;
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
    const { children, data, ...props } = externalProps;

    const columns = React.Children.toArray(children).map((child) => child.props);

    return (
        <div
            {...props}
            className="grid"
            style={{
                gridTemplateColumns: columns.reduce((accum, column) => `${accum} ${column.width ?? '1fr'}`, ''),
            }}
            ref={externalRef}
            role="table"
        >
            <div role="rowgroup" className="contents">
                <div role="row" className="contents">
                    {columns.map((column, j) => (
                        <span
                            role="columnheader"
                            className={`border border-b-4 border-b-gray-300 overflow-hidden font-bold underline p-2 ${
                                column.className ?? ''
                            }`}
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
                            <span role="cell" className={`border overflow-hidden p-2 ${column.className ?? ''}`} key={j}>
                                {column.renderer ? column.renderer(item[column.accessor]) : item[column.accessor]}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}) as ForwardedTableWithStatics;

Table.Column = Column;

export { Table, TableProps };
