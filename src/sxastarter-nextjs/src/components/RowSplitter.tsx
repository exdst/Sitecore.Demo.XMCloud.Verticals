import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const styles = `${props.params.GridParameters ?? ''} ${props?.params?.styles ?? ''}`.trimEnd();
  const rowStyles = [
    props?.params?.styles1,
    props?.params?.styles2,
    props?.params?.styles3,
    props?.params?.styles4,
    props?.params?.styles5,
    props?.params?.styles6,
    props?.params?.styles7,
    props?.params?.styles8,
  ];
  const enabledPlaceholders = props.params.EnabledPlaceholders.split(',');
  const id = props?.params?.RenderingIdentifier;

  return (
    <div className={`component row-splitter ${styles}`} id={id ? id : undefined}>
      {enabledPlaceholders.map((ph, index) => {
        const phKey = `row-${ph}-{*}`;
        const phStyles = `${rowStyles[+ph - 1] ?? ''}`.trimEnd();

        return (
          <div key={index} className={`container-fluid ${phStyles}`.trimEnd()}>
            <div key={index}>
              <div key={index} className="row">
                <Placeholder key={index} name={phKey} rendering={props.rendering} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
