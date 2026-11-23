import { services, steps } from "@/lib/work";
import { SectionHead } from "./section-head";

export function Services() {
  return (
    <section id="services" className="ko-services ko-wrap" aria-labelledby="services-title">
      <SectionHead
        index="02"
        title="Services"
        id="services-title"
        note="Six ways I take repetitive work off your plate, so you can spend the time on customers."
      />
      <ol className="ko-service-list">
        {services.map((service, index) => (
          <li className="ko-service" key={service.name}>
            <div className="ko-rule" aria-hidden="true" />
            <span className="ko-service-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{service.name}</h3>
            <div className="ko-service-body">
              <p>{service.text}</p>
              <ul className="ko-tools" aria-label="Tools">
                {service.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="ko-process">
        <p className="ko-process-label">How it works</p>
        <ol>
          {steps.map((item, index) => (
            <li key={item.step}>
              <span>{index + 1}</span>
              <strong>{item.step}</strong>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
