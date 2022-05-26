import { useMemo } from 'react'
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory'

interface Props {
  data: [{ x: string; y: number }[], { x: string; y: number }[]]
}
const StatusChart = ({ data }: Props) => {
  const maxima = data?.map((dataset) => Math.max(...dataset.map((d) => d.y)))

  const xOffsets = [100, 970]
  const tickPadding = [20, -20]
  const anchors = ['end', 'end']

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chartColors = ['#85DA47', '#4FADF7']

  const Line = useMemo(() => {
    return data?.map((item, idx) => (
      <VictoryLine
        key={`linechart-${item}`}
        data={item}
        animate={{
          duration: 1000,
          onLoad: { duration: 2000 },
        }}
        style={{
          data: { stroke: chartColors[idx] },
          parent: { border: '1.2px solid #EDEFF1' },
          labels: { fill: chartColors[idx], fontSize: 18 },
        }}
        y={(datum) => datum.y / maxima[idx]}
      />
    ))
  }, [chartColors, data, maxima])

  return (
    <div>
      <VictoryChart
        width={1000}
        height={400}
        theme={VictoryTheme.material}
        domainPadding={50}
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
        <VictoryAxis scale={{ x: 'time' }} />
        {data?.map((d, i) => (
          <VictoryAxis
            height={400}
            key={i}
            dependentAxis
            offsetX={xOffsets[i]}
            style={{
              axis: { stroke: '#ccc', strokeWidth: 0 },
              ticks: { stroke: 'transparent', padding: tickPadding[i] },
              grid: {
                stroke: '#ddd',
              },
              tickLabels: { marginTop: 30, padding: 10, textAnchor: anchors[i] },
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
