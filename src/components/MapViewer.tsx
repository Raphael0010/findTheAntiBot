import React from "react";
interface Props {
  inPath: boolean;
  row: number;
  column: number;
  isObstacle: boolean;
  first: boolean;
  finish: boolean;
}
export const DofusMapCell: React.FC<Props> = ({
  row,
  column,
  isObstacle,
  inPath,
  first,
  finish
}) => {
  const x = 22 * (row % 2) + column * 44;
  const y = row * 11;
  const fill = finish
    ? "rgb(112, 123, 86)"
    : first
    ? "rgb(231, 123, 86)"
    : inPath && isObstacle
    ? "rgb(0,128,0)"
    : inPath
    ? "rgb(0,0,128)"
    : isObstacle
    ? "rgb(244,67,54)"
    : "rgb(207,216,220)";
  return (
    <path
      d="M 22 0 L 44 11 L 22 22 L 0 11 L 22 0"
      transform={`translate(${x} ${y})`}
      fill={fill}
      stroke="white"
    />
  );
};

export const DofusMapViewer: React.FC<{ data: any; path: number[] }> = ({
  data,
  path
}) => {
  const cells = data.cells;
  return (
    <div>
      <div>
        <svg width="200" height="25">
          <text x="50" y="15" fill="black">
            Départ
          </text>
          <path
            d="M 22 0 L 44 11 L 22 22 L 0 11 L 22 0"
            fill="rgb(231, 123, 86)"
            stroke="white"
          />
        </svg>
        <svg width="200" height="25">
          <text x="50" y="15" fill="black">
            Arriver
          </text>
          <path
            d="M 22 0 L 44 11 L 22 22 L 0 11 L 22 0"
            fill="rgb(112, 123, 86)"
            stroke="white"
          />
        </svg>
      </div>
      <svg width="700" height="700" xmlns="http://www.w3.org/2000/svg">
        {range(0, 40).map(row =>
          range(0, 14).map(column => (
            <DofusMapCell
              first={path[0] === row * 14 + column}
              finish={path[path.length - 1] === row * 14 + column}
              inPath={path.includes(row * 14 + column)}
              key={`${row}-${column}`}
              row={row}
              column={column}
              // tslint:disable-next-line:no-bitwise
              isObstacle={(cells[row * 14 + column].l & 2) !== 2}
            />
          ))
        )}
      </svg>
    </div>
  );
};

function range(start: number, count: number): number[] {
  return Array.apply(0, Array(count)).map((_, index) => {
    return index + start;
  });
}
