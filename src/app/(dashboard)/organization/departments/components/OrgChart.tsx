import React, { useLayoutEffect, useRef } from 'react';
import { OrgChart } from 'd3-org-chart';

export const OrgChartComponent = (props: any) => {
  const d3Container = useRef(null);
  let chart: any = null;

  function addNode(node: any) {
    chart.addNode(node);
  }

  props.setClick(addNode);

  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeWidth((d: any) => 280)
        .nodeHeight((d: any) => 180)
        // .backgroundColor('#f7f9fc')
        .expandAll()
        .onNodeClick((d: any, i: any, arr: any) => {
          console.log(d, 'Id of clicked node ');
          props.onNodeClick(d);
        })
        .nodeContent(function (d: any, i: any, arr: any, state: any) {
          const managerName = d.data.manager?.username || 'N/A';
          const position = d.data.manager?.position?.title || 'N/A';
          const department = d.data.name || 'N/A';
          
          return `
            <div style="font-family: 'Inter', sans-serif; background-color: #ffffff; width: ${d.width}px; height: ${d.height}px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
              <div style="background-color: #3498db; padding: 16px; color: #ffffff;">
                <div style="font-size: 18px; font-weight: bold;">${department}</div>
              </div>
              <div style="padding: 16px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <img src="https://ui-avatars.com/api/?name=${managerName}&background=random" style="width: 50px; height: 50px; border-radius: 25px; margin-right: 12px;" />
                  <div>
                    <div style="font-size: 16px; font-weight: bold; color: #2c3e50;">${managerName}</div>
                    <div style="font-size: 14px; color: #7f8c8d;">${position}</div>
                  </div>
                </div>
                <div style="font-size: 14px; color: #34495e; background-color: #ecf0f1; padding: 8px 12px; border-radius: 6px;">
                  ${d.data._directSubordinates || 0} Direct Subordinates
                </div>
              </div>
            </div>
          `;
        })
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f7f9fc', padding: '20px' }}>
      <h1 style={{
        fontSize: '32px',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '30px',
        fontWeight: 'bold'
      }}>
        Organizational Chart
      </h1>
      <div ref={d3Container} />
    </div>
  );
};