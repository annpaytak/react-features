import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
// power bi client = power bi JS APIs

// sends repeatedly a lot of requests
export const PowerBiChart = () => {
    return (
        <PowerBIEmbed
            embedConfig = {{
                type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                id: '<Report Id>',
                embedUrl: '<Embed Url>',
                accessToken: '<Access Token>',
                tokenType: models.TokenType.Embed,
                settings: {
                    panes: {
                        filters: {
                            expanded: false,
                            visible: false
                        }
                    },
                    background: models.BackgroundType.Transparent,
                }
            }}

            eventHandlers = {
                new Map([
                    ['loaded', function () {console.log('Report loaded');}],
                    ['rendered', function () {console.log('Report rendered');}],
                    ['error', function (event) {console.log(event.detail);}]
                ])
            }

            cssClassName = { "report-style-class" }

            getEmbeddedComponent = { (embeddedReport) => {
                window.report = embeddedReport;
                // this.report = embeddedReport as Report; TS
            }}
        />
    )
}