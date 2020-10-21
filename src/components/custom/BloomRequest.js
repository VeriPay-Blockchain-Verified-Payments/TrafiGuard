import React from 'react'
import { RequestElement, Action } from '@bloomprotocol/share-kit-react'

const requestData = {
    action: Action.attestation,
    token: '730531c6-5ba0-4d63-b7a9-6635f1dce772',
    org_name: 'Bloom',
    url: 'http://payid.trade:6783/api/receive',
    org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
    org_usage_policy_url: 'https://bloom.co/legal/terms',
    org_privacy_policy_url: 'https://bloom.co/legal/privacy',
    types: ['phone', 'email']
}

const BloomQR = () => ( <
    RequestElement requestData = { requestData }
    buttonCallbackUrl = "https://bloom.co?token=730531c6-5ba0-4d63-b7a9-6635f1dce772"
    qrOptions = {
        {
            size: 256,
            hideLogo: false,
            fgColor: '#6067f1'
        }
    }
    />
)

export default BloomQR