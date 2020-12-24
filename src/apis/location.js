import config from '../config';
import axios from 'axios';

const baseEndpoint = `${config.apiLocationBaseURL}`;

// eslint-disable-next-line import/prefer-default-export
export const getAllProvinces = async data => {
  try {
    const endpoint = `${baseEndpoint}/provinces?size=100`;
    const { data } = await axios.get(endpoint);

    return {
      success: true,
      data
    };
  } catch (err) {
    return { success: false, message: 'Không thể lấy thông tin tỉnh thành' };
  }
};

export const getAllDistricts = async id => {
  try {
    const endpoint = `${baseEndpoint}/districts?size=100&provinceId.equals=${id}`;
    const { data } = await axios.get(endpoint);

    return {
      success: true,
      data
    };
  } catch (err) {
    return { success: false, message: 'Không thể lấy thông tin quận huyện' };
  }
};

export const getAllWards = async id => {
  try {
    const endpoint = `${baseEndpoint}/wards?size=100&districtId.equals=${id}`;
    const { data } = await axios.get(endpoint);

    return {
      success: true,
      data
    };
  } catch (err) {
    return { success: false, message: 'Không thể lấy thông tin phường xã' };
  }
};
