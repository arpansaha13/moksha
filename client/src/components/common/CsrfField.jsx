import getCookie from '../../utils/getCookie'

const csrftoken = getCookie('csrftoken')

const CsrfField = () => {
    return (
        <input name="csrfmiddlewaretoken" value={csrftoken} type="hidden" />
    )
}

export default CsrfField
