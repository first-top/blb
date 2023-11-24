class TestBlock {
  score = 0
  maxScore = 10
  maxSelect = 4
  chosenCharacteristics = 0
  different = this.maxScore - this.score
  block = null
  id = null
  selects = null
  notificationBlock = null
  
  // blockEvent = new Event("selectChange")
  
  constructor(id) {
    this.id = id
    this.block = document.querySelector(`[data-id=${id}]`)
    if (this.block) this.init()
  }
  
  reRenderOptions() {
    const isLowerThanMaxSelect = this.isLowerThanMaxSelect()
    for (let select of this.selects) {
      let options = ""
      const currentValue = +select.value
      const maxValue = +select.value + this.different
      const different = this.different
      select.closest(".k1-table__row").setAttribute("data-test", maxValue)
      for (let i = 0; i <= maxValue; i++) {
        const selected = currentValue === i ? "selected" : ""
        options += `<option  value="${i}" ${selected}>${i}</option>`
      }
      
      select.innerHTML = options
      if (!currentValue) {
        if (isLowerThanMaxSelect) select.removeAttribute("disabled")
        else select.setAttribute("disabled", true)
      }
    }
    
  }
  isLowerThanMaxSelect() {
    const selectedCount = [...this.selects].filter(select => select.value > 0).length
    return selectedCount < this.maxSelect
  }
  
  getCurrentScore() {
    let values =
      [...this.selects]
        .filter(select => select.value > 0)
        .map(select => +select.value)
    
    return values
      .reduce(
        (accumulator, item) => accumulator + item,
        0
      )
  }
  
  getGraphResult() {
    let result = {}
    for (let select of this.selects) {
      if (+select.value !== 0) {
        result[select.name] = +select.value
      }
    }
    return result
  }
  
  getNotificationText() {
    let scoreText = ""
    switch (this.score) {
      case 1:
        scoreText = "балл"
        break;
      case 2:
      case 3:
      case 4:
        scoreText = "балла"
        break;
      default:
        scoreText = "баллов"
        break;
    }
    if (this.score < this.maxScore)
      return `Вами выставлено ${this.score} ${scoreText} из 10. Распределите еще 10 балла(-ов) в этом блоке. Можно выбрать 2-3, но не более 4-х утверждений.`
    else
      return `Готово, переходи к следующему вопросу!`
  }
  
  setNotificationBlock() {
    if (this.notificationBlock) {
      this.notificationBlock.textContent = this.getNotificationText()
      if (this.score < this.maxScore) {
        this.notificationBlock.classList.remove("success")
      } else {
        this.notificationBlock.classList.add("success")
      }
    }
  }
  
  changeSelectHandler() {
    this.score = this.getCurrentScore()
    this.different = this.maxScore - this.score
    this.reRenderOptions()
    this.setNotificationBlock()
    const options = {
      detail: {
        success: this.score === this.maxScore,
        id: this.id
      }
    }
    this.block.dispatchEvent(new CustomEvent("selectChange", options))
  }
  
  addHandlers() {
    for (let select of this.selects) {
      select.value = 0
      select.addEventListener("change", this.changeSelectHandlerBind)
    }
  }
  
  init() {
    this.selects = this.block.querySelectorAll("select")
    this.notificationBlock = this.block.querySelector(".k1-table__notification")
    this.changeSelectHandlerBind = this.changeSelectHandler.bind(this)
    this.addHandlers()
  }
}

class TestResult {
  graph = {
    gi: {
      data: [
        {
          name: "team-help",
          mark: "C",
          value: 0
        },
        {
          name: "team-flaws",
          mark: "H",
          value: 0
        },
        {
          name: "team-work",
          mark: "D",
          value: 0
        },
        {
          name: "team-work-attitude",
          mark: "F",
          value: 0
        },
        {
          name: "satisfaction",
          mark: "H",
          value: 0
        },
        {
          name: "team-stranger-fast-task",
          mark: "B",
          value: 0
        },
        {
          name: "problems",
          mark: "F",
          value: 0
        }
      ],
      name: "Генератор идей (мыслитель)",
      description: "Обладает богатым воображением, новатор, характеризуется повышенной креативностью. \n" +
        "Находит решения сложных проблем.",
      sum: 0
    },
    ir: {
      data: [
        {
          name: "team-help",
          mark: "A",
          value: 0
        },
        {
          name: "team-flaws",
          mark: "D",
          value: 0
        },
        {
          name: "team-work",
          mark: "F",
          value: 0
        },
        {
          name: "team-work-attitude",
          mark: "H",
          value: 0
        }, {
          name: "satisfaction",
          mark: "E",
          value: 0
        },
        {
          name: "team-stranger-fast-task",
          mark: "I",
          value: 0
        },
        {
          name: "problems",
          mark: "D",
          value: 0
        }
      ],
      name: "Исследователь ресурсов",
      description: "Продвигает идеи и запускает проекты на раннем этапе. Свойственны чрезмерный оптимизм и потеря интереса, если проходит первоначальный энтузиазм. Часто владеет искусством переговоров и эффективных коммуникаций.",
      sum: 0
    },
    kd: {
      data: [
        {
          name: "team-help",
          mark: "D",
          value: 0
        },
        {
          name: "team-flaws",
          mark: "B",
          value: 0
        },
        {
          name: "team-work",
          mark: "A",
          value: 0
        },
        {
          name: "team-work-attitude",
          mark: "I",
          value: 0
        }, {
          name: "satisfaction",
          mark: "F",
          value: 0
        },
        {
          name: "team-stranger-fast-task",
          mark: "D",
          value: 0
        },
        {
          name: "problems",
          mark: "G",
          value: 0
        }
      ],
      name: "Координатор (председатель)",
      description: "Объясняет цели и приоритеты, продвигает в принятии решений.",
      sum: 0
    },
    mt: {
      data: [
        {
          name: "team-help",
          mark: "F",
          value: 0
        },
        {
          name: "team-flaws",
          mark: "F",
          value: 0
        },
        {
          name: "team-work",
          mark: "C",
          value: 0
        },
        {
          name: "team-work-attitude",
          mark: "C",
          value: 0
        }, {
          name: "satisfaction",
          mark: "D",
          value: 0
        },
        {
          name: "team-stranger-fast-task",
          mark: "B",
          value: 0
        },
        {
          name: "problems",
          mark: "A",
          value: 0
        }
      ],
      name: "Мотиватор (формирователь, творец)",
      description: "Ориентация на решение поставленной задачи, побуждение коллег работать интенсивнее. \n" +
        "Напористость и смелость в преодолении препятствий. \n" +
        "Склонен к провокациям и часто не внимателен к чувствам других людей.",
      sum: 0
    },
    an: {
      data: [
        {
          name: "team-help",
          mark: "I",
          value: 0
        },
        {
          name: "team-flaws",
          mark: "E",
          value: 0
        },
        {
          name: "team-work",
          mark: "H",
          value: 0
        },
        {
          name: "team-work-attitude",
          mark: "D",
          value: 0
        }, {
          name: "satisfaction",
          mark: "A",
          value: 0
        },
        {
          name: "team-stranger-fast-task",
          mark: "F",
          value: 0
        },
        {
          name: "problems",
          mark: "B",
          value: 0
        }
      ],
      name: "Аналитик (оценщик, эксперт)",
      description: "Ориентирован на беспристрастный, критический анализ ситуации.Видит все возможности. Умеет дать точную оценку.",
      sum: 0
    },
    vk: {
      data: [
        {
          name: "team-help",
          mark: "B",
          value: 0
        },
        {
          name: "team-flaws",
          mark: "G",
          value: 0
        },
        {
          name: "team-work",
          mark: "E",
          value: 0
        },
        {
          name: "team-work-attitude",
          mark: "A",
          value: 0
        }, {
          name: "satisfaction",
          mark: "C",
          value: 0
        },
        {
          name: "team-stranger-fast-task",
          mark: "C",
          value: 0
        },
        {
          name: "problems",
          mark: "I",
          value: 0
        }
      ],
      name: "Вдохновитель команды (коллективист, дипломат, душа команды)",
      description: "Гармонизирует отношения в команде и устраняет разногласия.",
      sum: 0
    },
    rz: {
      data: [
        {
          name: "team-help",
          mark: "H",
          value: 0
        },
        {
          name: "team-flaws",
          mark: "A",
          value: 0
        },
        {
          name: "team-work",
          mark: "I",
          value: 0
        },
        {
          name: "team-work-attitude",
          mark: "E",
          value: 0
        }, {
          name: "satisfaction",
          mark: "B",
          value: 0
        },
        {
          name: "team-stranger-fast-task",
          mark: "G",
          value: 0
        },
        {
          name: "problems",
          mark: "E",
          value: 0
        }
      ],
      name: "Реализатор (исполнитель)",
      description: "Претворяет идеи в практические действия, вносит упорядоченность в деятельность команды.",
      sum: 0
    },
    kt: {
      data: [
        {
          name: "team-help",
          mark: "E",
          value: 0
        },
        {
          name: "team-flaws",
          mark: "I",
          value: 0
        },
        {
          name: "team-work",
          mark: "B",
          value: 0
        },
        {
          name: "team-work-attitude",
          mark: "G",
          value: 0
        }, {
          name: "satisfaction",
          mark: "G",
          value: 0
        },
        {
          name: "team-stranger-fast-task",
          mark: "E",
          value: 0
        },
        {
          name: "problems",
          mark: "C",
          value: 0
        }
      ],
      name: "Контролёр (Доводчик,завершитель)",
      description: "Следит за тем, чтобы задания выполнялись полностью и своевременно",
      sum: 0
    },
    sp: {
      data: [
        {
          name: "team-help",
          mark: "G",
          value: 0
        },
        {
          name: "team-flaws",
          mark: "C",
          value: 0
        },
        {
          name: "team-work",
          mark: "G",
          value: 0
        },
        {
          name: "team-work-attitude",
          mark: "B",
          value: 0
        },
        {
          name: "satisfaction",
          mark: "I",
          value: 0
        },
        {
          name: "team-stranger-fast-task",
          mark: "A",
          value: 0
        },
        {
          name: "problems",
          mark: "H",
          value: 0
        }
      ],
      name: "Специалист",
      description: "Сосредоточен на технической стороне дела. Со временем развивает редкие навыки и умения.",
      sum: 0
    }
  }
  reportNode = ""
  getResult(data) {
    this.calculateResult(data)
    return this.reportNode
  }
  calculateResult(data) {
    for (let role in this.graph) {
      if (this.graph.hasOwnProperty(role)) {
        this.graph[role].sum = 0
        for (let item of this.graph[role].data) {
          const key = item.name
          const mark = item.mark
          if (data[key])
            item.value = data[key][mark] ?? 0
          
          this.graph[role].sum += item.value
          
        }
      }
    }
    const sortable = []
    for (let key in this.graph) {
      sortable.push([key, this.graph[key].sum]);
    }
    
    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });
    this.reportNode = `
  <div class="k1-report">
    <div class="k1-report__head">
      <div class="k1-report__row">
        <div class="k1-report__cell">Роль</div>
        <div class="k1-report__cell">Краткое описание роли</div>
      </div>
    </div>
    <div class="k1-report__body">
      <div class="k1-report__row">
        <div class="k1-report__cell">${this.graph[sortable[0][0]].name}</div>
        <div class="k1-report__cell">${this.graph[sortable[0][0]].description}</div>
      </div>
      <div class="k1-report__row">
        <div class="k1-report__cell">${this.graph[sortable[1][0]].name}</div>
        <div class="k1-report__cell">${this.graph[sortable[1][0]].description}</div>
      </div>
    </div>
  </div>
    `
  }
}

class App {
  blockNodes = document.querySelectorAll(".single-block[data-id]")
  nameNode = document.querySelector("form[name=k1-contacts] input[name=name]")
  phoneNode = document.querySelector("form[name=k1-contacts] input[name=phone]")
  sendButton = document.querySelector("form[name=k1-contacts] button")
  k1Contacts = document.querySelector(".k1-contacts")
  blocksData = {}
  testData = null
  nameData = ""
  phoneData = ""
  testResult = new TestResult()
  resultNode = `<div>
<p>
Согласно масштабному исследованию Рэймонда Мередита Белбина, у каждого человека есть 8 психологических управленческих качеств, ниже представлены 2 ваших сильных качества:
</p>
%%reportNode%%
</div>`
 
  constructor() {
    this.init()
  }
  
  isAllTestSuccess() {
    for (let key in this.blocksData) {
      if (this.blocksData.hasOwnProperty(key)) {
        if (!this.blocksData[key].success) return false
      }
    }
    return true
  }
  
  isValidName() {
    return this.nameData.length > 2
  }
  
  isValidPhone() {
    const reg = new RegExp(/(.*\d.*){11}/)
    return reg.test(this.phoneData)
  }
  
  isReadyForSend() {
    return this.isValidName() && this.isValidPhone() && !!this.testData
  }
  
  setButtonDisabled() {
    if (this.isReadyForSend()) {
      this.sendButton.removeAttribute("disabled")
    } else {
      this.sendButton.setAttribute("disabled", "true")
    }
  }
  
  setTestData() {
    if (this.isAllTestSuccess()) {
      this.testData = {}
      for (let block of this.blockNodes) {
        const id = block.getAttribute("data-id")
        this.testData[id] = this.blocksData[id].objectClass.getGraphResult()
      }
    } else {
      this.testData = null
    }
  }
  
  inputHandler({target}) {
    switch (target.name) {
      case "name" :
        this.nameData = target.value
        break
      case "phone":
        this.phoneData = target.value
        break
    }
    this.setButtonDisabled()
  }
  
  sendHandler(event) {
    event.preventDefault()
    if (this.isReadyForSend()) {
      const report = this.testResult.getResult(this.testData).trim()
      this.resultNode = this.resultNode.replace("%%reportNode%%", report)
      this.k1Contacts.insertAdjacentHTML("afterend", this.resultNode)
    }
  }
  
  selectChangeEventHandler({detail}) {
    const {id, success} = detail
    this.blocksData[id].success = success
    this.setTestData()
    this.setButtonDisabled()
  }
  
  addHandlers() {
    for (let block of this.blockNodes) {
      const id = block.getAttribute("data-id")
      block.addEventListener("selectChange", this.selectChangeEventHandlerBind)
      if (id) {
        this.blocksData[id] = {
          objectClass: new TestBlock(id),
          success: false
        }
      }
    }
    this.nameNode.addEventListener("input", this.inputHandlerBind)
    this.phoneNode.addEventListener("input", this.inputHandlerBind)
    this.sendButton.addEventListener("click", this.sendHandlerBind)
  }
  
  init() {
    this.selectChangeEventHandlerBind = this.selectChangeEventHandler.bind(this)
    this.inputHandlerBind = this.inputHandler.bind(this)
    this.sendHandlerBind = this.sendHandler.bind(this)
    this.addHandlers()
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new App()
})
