import { useEffect, useMemo } from 'react'
import {
  VictoryAxis,
  VictoryChart,
  VictoryLegend,
  VictoryLine,
  VictoryScatter,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory'

// const data = [
//   [
//     { x: '2022-02-01', y: 1234 },
//     { x: '2022-02-02', y: 2 },
//     { x: '2022-02-03', y: 32 },
//     { x: '2022-02-04', y: 444 },
//   ],
//   [
//     { x: '2022-02-01', y: 4000 },
//     { x: '2022-02-02', y: 35000000 },
//     { x: '2022-02-03', y: 30000000 },
//     { x: '2022-02-04', y: 25000 },
//   ],
// ]

// find maxima for normalizing data

// const CustomTooltip = (x, y) => {
//   const { x, y } = this.props
//   const rotation = `rotate(45 ${x} ${y})`
//   return (
//     <g transform={rotation}>
//       <VictoryTooltip {...this.props} renderInPortal={false} />
//     </g>
//   )
// }

interface Props {
  data: [{ x: string; y: number }[], { x: string; y: number }[]]
}
const StatusChart = ({ data }: Props) => {
  const maxima = data?.map((dataset) => Math.max(...dataset.map((d) => d.y)))

  const xOffsets = [100, 970]
  const tickPadding = [10, 10]
  const anchors = ['end', 'end']
  const bgColors = ['#94A2AD', '#EDEFF1']

  const colors = ['#85DA47', '#4FADF7']
  const Line = useMemo(() => {
    return data?.map((item, idx) => (
      <VictoryLine
        key={`${item}+${idx}`}
        data={item}
        animate={{
          duration: 1000,
          onLoad: { duration: 2000 },
        }}
        style={{
          data: { stroke: colors[idx] },
          parent: { border: '1.2px solid #ccc' },
          labels: { fill: colors[idx], fontSize: 20 },
        }}
        y={(datum) => datum.y / maxima[idx]}
      />
    ))
  }, [data])

  return (
    <div>
      <VictoryChart
        width={1000}
        // height={300}
        theme={VictoryTheme.material}
        domainPadding={30}
        padding={{ top: 0, bottom: 50, right: 20, left: 20 }}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiPadding={5}
            labels={({ datum }) => `y: ${datum.y}`}
            labelComponent={
              <VictoryTooltip
                cornerRadius={5}
                flyoutStyle={{
                  fill: '#3a474e',
                  strokeWidth: 0,
                }}
              />
            }
          />
        }
      >
        <VictoryAxis
          scale={{ x: 'time' }}
          // padding={{ top: 0, bottom: 50, right: 20, left: 20 }}
          style={{
            axis: { stroke: '#94A2AD' },
          }}
        />
        {data?.map((d, i) => (
          <VictoryAxis
            // height={400}
            dependentAxis
            key={i}
            offsetX={xOffsets[i]}
            style={{
              // grid: { stroke: 'gray' },
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' },
            }}
            // Use normalized tickValues (0 - 1)
            tickValues={[0.25, 0.5, 0.75, 1]}
            tickFormat={(t) => t * maxima[i]}
          />
        ))}

        {Line}
      </VictoryChart>
    </div>
  )
}

export default StatusChart
