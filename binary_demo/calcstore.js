function CalculatorStore() {
  riot.observable(this)
  
  var self = this

  self.hex = ''
  self.max = 7
  self.bitlist = []

  self.convert = function(num, currentRadix, resultRadix) {
    return parseInt(num, currentRadix).toString(resultRadix)
  }

  self.on('hex_changed', function(hexVal) {
    self.hex = hexVal
    var bNum = parseInt(hexVal,16)
    self.bitlist = []
    for (var i = 0; i<=self.max; i++) {
      self.bitlist.push({ pos: self.max-i, value: ((1 << self.max-i) & bNum) > 0 ? 1 : 0})
    }

    self.trigger('binary_changed', self.bitlist)
  })

  self.on('bit_changed', function(bitPos) {     
    var mask = (1 << bitPos)
    var newHex = parseInt(self.hex,16) ^ mask
    self.trigger('hex_forced_change', self.convert(newHex, 10, 16))
  })

}
