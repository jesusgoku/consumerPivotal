const rp = require('request-promise');

function Pivotal(api_token) {
  this.base_url = 'https://www.pivotaltracker.com/services/v5';
  this.api_token = api_token;


}

(function () {
  this.getOptions = function (path, query_string) {
    var _this = this;
    var query_string = query_string || {};

    return {
        uri: _this.base_url + path,
        qs: query_string,
        headers: {
          'X-TrackerToken': _this.api_token
        },
        json: true
      };
  };

  this.getProjects = function (params) {
    let options = this.getOptions('/projects');
    return rp(options);
  };

  this.getLabels = function (project_id, params) {
    let options = this.getOptions('/projects/' + String(project_id) + '/labels');
    return rp(options);
  };

  this.getStories = function (project_id, params) {
    let options = this.getOptions('/projects/' + String(project_id) + '/stories', {
      with_label: params.label,
    });
    return rp(options);
  };

  this.getEpics = function (project_id, params) {
    let options = this.getOptions('/projects/' + String(project_id) + '/epics');
    return rp(options);
  };
}).apply(Pivotal.prototype);

module.exports = Pivotal;
